#!/usr/bin/env node
import { existsSync, mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from 'fs'
import { join, relative } from 'path'
import { fileURLToPath } from 'url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const ROOT = join(__dirname, '..')
const FEATURES_DIR = join(ROOT, 'features')
const TEMPLATES_DIR = join(ROOT, 'templates')

// ---------------------------------------------------------------------------
// Minimal prompt helpers (no dependencies)
// ---------------------------------------------------------------------------

import { createInterface } from 'readline'

const rl = createInterface({ input: process.stdin, output: process.stdout })

function ask(question) {
  return new Promise((resolve) => rl.question(question, resolve))
}

async function select(question, options) {
  console.log(`\n${question}`)
  options.forEach((opt, i) => console.log(`  ${i + 1}) ${opt}`))
  while (true) {
    const answer = await ask('  Enter number(s), comma-separated: ')
    const picked = answer
      .split(',')
      .map((s) => parseInt(s.trim(), 10) - 1)
      .filter((i) => i >= 0 && i < options.length)
    if (picked.length > 0) return picked.map((i) => options[i])
    console.log('  Invalid choice, try again.')
  }
}

async function confirm(question) {
  const answer = await ask(`${question} (y/n): `)
  return answer.trim().toLowerCase() === 'y'
}

// ---------------------------------------------------------------------------
// File system helpers
// ---------------------------------------------------------------------------

function copyDir(src, dest, replacer) {
  mkdirSync(dest, { recursive: true })
  for (const entry of readdirSync(src)) {
    const srcPath = join(src, entry)
    const destPath = join(dest, replacer(entry))
    if (statSync(srcPath).isDirectory()) {
      copyDir(srcPath, destPath, replacer)
    } else {
      const content = readFileSync(srcPath, 'utf8')
      writeFileSync(destPath, replacer(content))
    }
  }
}

function makeReplacer(featureName) {
  return (str) => str.replaceAll('__FEATURE_NAME__', featureName)
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  console.log('\n  features-collected — create-feature\n')

  // 1. Feature name
  let featureName = ''
  while (!featureName) {
    featureName = (await ask('  Feature name (kebab-case): ')).trim()
    if (!featureName) console.log('  Name cannot be empty.')
    else if (!/^[a-z][a-z0-9-]*$/.test(featureName)) {
      console.log('  Use lowercase letters, numbers and hyphens only.')
      featureName = ''
    }
  }

  const featureDir = join(FEATURES_DIR, featureName)
  if (existsSync(featureDir)) {
    console.error(`\n  Error: features/${featureName} already exists.\n`)
    process.exit(1)
  }

  // 2. Frontend
  const frontendOptions = ['React (Vite)', 'Astro', 'Both', 'None']
  const [frontendChoice] = await select('  Frontend framework?', frontendOptions)

  // 3. Backend
  const includeBackend = await confirm('\n  Include NestJS backend?')

  // 4. Scaffold
  console.log('\n  Creating feature...\n')
  const replacer = makeReplacer(featureName)

  const wantsReact = frontendChoice === 'React (Vite)' || frontendChoice === 'Both'
  const wantsAstro = frontendChoice === 'Astro' || frontendChoice === 'Both'
  const wantsBoth = wantsReact && wantsAstro

  // When both frameworks are chosen, keep distinct suffixed package names.
  // When only one is chosen, normalise the package name to just `<feature>-frontend`.
  function makeFrameworkReplacer(framework) {
    return (str) =>
      str
        .replaceAll('__FEATURE_NAME__', featureName)
        .replaceAll(`${featureName}-frontend-${framework}`, `${featureName}-frontend`)
  }

  if (wantsBoth) {
    copyDir(join(TEMPLATES_DIR, 'frontend-react'), join(featureDir, 'frontend-react'), replacer)
    console.log(`  ✓ features/${featureName}/frontend-react`)
    copyDir(join(TEMPLATES_DIR, 'frontend-astro'), join(featureDir, 'frontend-astro'), replacer)
    console.log(`  ✓ features/${featureName}/frontend-astro`)
  } else if (wantsReact) {
    copyDir(join(TEMPLATES_DIR, 'frontend-react'), join(featureDir, 'frontend'), makeFrameworkReplacer('react'))
    console.log(`  ✓ features/${featureName}/frontend`)
  } else if (wantsAstro) {
    copyDir(join(TEMPLATES_DIR, 'frontend-astro'), join(featureDir, 'frontend'), makeFrameworkReplacer('astro'))
    console.log(`  ✓ features/${featureName}/frontend`)
  }

  if (includeBackend) {
    copyDir(join(TEMPLATES_DIR, 'backend-nestjs'), join(featureDir, 'backend'), replacer)
    console.log(`  ✓ features/${featureName}/backend`)
  }

  // 5. Done
  console.log(`
  Done! Feature "${featureName}" created.

  Next steps:
    pnpm install        # link new packages
    pnpm dev            # start all apps
`)

  rl.close()
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
