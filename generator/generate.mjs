import fs from 'fs/promises'
import { dirname, join, basename } from 'path'
import url from 'url'
import mkdirp from 'mkdirp'
import rimraf from 'rimraf'

const filesToIgnore = ['node_modules', '.next', '.env']
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
    .sort()
  
  console.log(`Detected use cases: ${useCases.join(', ')}`)

  for (const [i, useCase] of useCases.entries()) {
    console.log(`\nGenerating "${useCase}" use case`)
    const port = 3000 + i + 1

    const generatorUseCasePath = join(generatorUseCasesPath, useCase)
    const useCasePath = join(useCasesPath, useCase)

    console.log('Copying the template')
    const pathsToDelete = (await fs.readdir(useCasePath).catch(() => []))
      .filter(file => !filesToIgnore.includes(file))
      .map(file => join(useCasePath, file))
    await deletePath(pathsToDelete)
    await merge(templatePath, useCasePath, { filter: (path) => !filesToIgnore.includes(basename(path)) })

    for (const path of pathsToOverwrite) {
      if (await exists(join(generatorUseCasePath, ...path))) {
        console.log(`Deleting "${path.join('/')}" path from the template`)
        await deletePath(join(useCasePath, ...path))
      }
    }

    console.log(`Applying overrides`)
    await merge(generatorUseCasePath, useCasePath, { filter: (path) => !filesToIgnore.includes(basename(path)) })

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
    const readmePath = join(useCasePath, 'README.md')
    await fs.cp(join(rootPath, 'README.md'), readmePath)
    await replace(readmePath, { '{use-case}': useCase })

    const envPath = join(useCasePath, '.env')
    if (!(await exists(envPath))) {
      await fs.cp(join(useCasePath, '.env.example'), envPath)
      await replace(envPath, { 'localhost:3000': `localhost:${port}` })
    }
  }
}

async function transformJson(path, transformFn) {
  const json = JSON.parse(await fs.readFile(path, { encoding: 'utf-8' }))
  transformFn(json)
  await fs.writeFile(path, JSON.stringify(json, null, 2), { encoding: 'utf-8' })
}

async function replace(path, variables) {
  let text = await fs.readFile(path, { encoding: 'utf-8' })

  for (const [key, value] of Object.entries(variables)) {
    text = text.replaceAll(key, value)
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
