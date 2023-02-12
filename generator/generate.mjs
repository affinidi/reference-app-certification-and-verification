import fs from 'fs/promises'
import { dirname, join } from 'path'
import url from 'url'
import mkdirp from 'mkdirp'
import rimraf from 'rimraf'

const pathsToMerge = [
  ['public', 'images'],
]

const pathsToOverwrite = [
  ['pages', 'holder', 'components'],
  ['pages', 'issuer', 'credential-form'],
  ['utils', 'theme.ts'],
  ['utils', 'schema.ts']
]

const __dirname = dirname(url.fileURLToPath(import.meta.url))

async function generate() {
  const rootPath = join(__dirname, '..')
  const flavorsPath = join(rootPath, 'flavors')
  const generatorPath = join(rootPath, 'generator')
  const generatorFlavorsPath = join(generatorPath, 'flavors')

  const templatePath = join(generatorPath, 'template')

  const flavors = (await fs.readdir(generatorFlavorsPath, { withFileTypes: true }))
    .filter(i => i.isDirectory()).map(i => i.name)
  
  console.log(`Detected flavors: ${flavors.join(', ')}`)

  for (const flavor of flavors) {
    console.log(`Generating "${flavor}" flavor`)

    const generatorFlavorPath = join(generatorFlavorsPath, flavor)
    const flavorPath = join(flavorsPath, flavor)

    console.log('Copying the template')
    await overwrite(templatePath, flavorPath)

    for (const path of pathsToMerge) {
      console.log(`Merging "${path.join('/')}" path`)
      await merge(join(generatorFlavorPath, ...path), join(flavorPath, ...path))
    }

    for (const path of pathsToOverwrite) {
      console.log(`Overwriting "${path.join('/')}" path`)
      await overwrite(join(generatorFlavorPath, ...path), join(flavorPath, ...path))
    }
    
    console.log('Transforming package.json and package-lock.json files')
    const packageName = `reference-app-${flavor}`
    await transformJson(join(flavorPath, 'package.json'), (packageJson) => {
      packageJson.name = packageName
    })
    await transformJson(join(flavorPath, 'package-lock.json'), (packageLockJson) => {
      packageLockJson.name = packageName
      packageLockJson.packages[''].name = packageName
    })

    console.log('Replacing variables in README.md file')
    await replaceVariables(join(flavorPath, 'README.md'), { flavor })
  }
}

async function transformJson(path, transformFn) {
  const json = JSON.parse(await fs.readFile(path, { encoding: 'utf-8' }))
  transformFn(json)
  await fs.writeFile(path, JSON.stringify(json, null, 2), { encoding: 'utf-8' })
}

async function replaceVariables(path, variables) {
  let text = await fs.readFile(path, { encoding: 'utf-8' })

  for (const [key, value] of Object.entries(variables)) {
    text = text.replaceAll(`{${key}}`, value)
  }

  await fs.writeFile(path, text, { encoding: 'utf-8' })
}

async function merge(src, dest) {
  await mkdirp(join(dest, '..'))
  
  try {
    await fs.cp(src, dest, {
      recursive: true,
      filter: (src) => !src.includes('node_modules/'),
    })
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.warn(`Warning: Source doesn't exist: ${src}`)
    } else {
      throw error
    }
  }
}

async function overwrite(src, dest) {
  await deletePath(dest)
  await merge(src, dest)
}

async function deletePath(path) {
  await rimraf(path)
}

generate()
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
  .then(() => {
    console.log('Done!')
    process.exit(0)
  })
