import fs from 'fs/promises'
import { dirname, join, basename } from 'path'
import url from 'url'
import mkdirp from 'mkdirp'
import rimraf from 'rimraf'

const filesToAvoid = ['node_modules', '.next', '.env']

const pathsToMerge = [
  ['public', 'images'],
  ['assets'],
  ['utils'],
  ['components'],
  ['styles'],
  ['verifier'],
  ['pages', 'components'],
  ['pages', 'home'],
  ['docs'],
  ['pages', 'holder'],
  ['pages', 'issuer'],
]

const pathsToOverwrite = [
  ['pages', 'holder', 'components'],
  ['pages', 'issuer', 'credential-form'],
]

const __dirname = dirname(url.fileURLToPath(import.meta.url))

async function generate() {
  const rootPath = join(__dirname, '..')
  const useCasesPath = join(rootPath, 'use-cases')
  const generatorPath = join(rootPath, 'generator')
  const generatorUseCasesPath = join(generatorPath, 'use-cases')

  const templatePath = join(generatorPath, 'template')

  const useCases = (await fs.readdir(generatorUseCasesPath, { withFileTypes: true }))
    .filter(i => i.isDirectory()).map(i => i.name)
  
  console.log(`Detected use cases: ${useCases.join(', ')}`)

  for (const useCase of useCases) {
    console.log(`\nGenerating "${useCase}" use case`)

    const generatorUseCasePath = join(generatorUseCasesPath, useCase)
    const useCasePath = join(useCasesPath, useCase)

    console.log('Copying the template')
    const pathsToDelete = (await fs.readdir(useCasePath).catch(() => []))
      .filter(file => !filesToAvoid.includes(file))
      .map(file => join(useCasePath, file))
    await deletePath(pathsToDelete)
    await merge(templatePath, useCasePath, { filter: (path) => !filesToAvoid.includes(basename(path)) })

    for (const path of pathsToMerge) {
      console.log(`Merging "${path.join('/')}" path`)
      await merge(join(generatorUseCasePath, ...path), join(useCasePath, ...path))
    }

    for (const path of pathsToOverwrite) {
      console.log(`Overwriting "${path.join('/')}" path`)
      if (await exists(join(generatorUseCasePath, ...path))) {
        await overwrite(join(generatorUseCasePath, ...path), join(useCasePath, ...path))
      }
    }
    
    console.log('Transforming package.json and package-lock.json files')
    const packageName = `reference-app-${useCase}`
    await transformJson(join(useCasePath, 'package.json'), (packageJson) => {
      packageJson.name = packageName
    })
    await transformJson(join(useCasePath, 'package-lock.json'), (packageLockJson) => {
      packageLockJson.name = packageName
      packageLockJson.packages[''].name = packageName
    })

    console.log('Generating the README.md file')
    await fs.cp(join(rootPath, 'README.md'), join(useCasePath, 'README.md'))
    await replaceVariables(join(useCasePath, 'README.md'), { "use-case": useCase })
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

async function merge(from, to, options) {
  await mkdirp(join(to, '..'))
  
  try {
    await fs.cp(from, to, { recursive: true, ...options })
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.warn(`Warning: Source doesn't exist: ${from}`)
    } else {
      throw error
    }
  }
}

async function overwrite(from, to) {
  await deletePath(to)
  await merge(from, to)
}

async function deletePath(path) {
  await rimraf(path)
}

async function exists(path) {
  try {
    await fs.access(path)
    return true
  } catch {
    return false
  }
}

generate()
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
  .then(() => {
    console.log('\nDone!')
    process.exit(0)
  })
