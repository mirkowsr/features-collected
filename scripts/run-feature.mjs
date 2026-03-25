#!/usr/bin/env node
import { spawnSync } from 'child_process'
import { fileURLToPath } from 'url'
import { resolve } from 'path'

const feature = process.argv[2]

if (!feature) {
  console.error('\n  Usage: pnpm feature <feature-name>\n  Example: pnpm feature feature-a\n')
  process.exit(1)
}

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const turbo = resolve(__dirname, '../node_modules/.bin/turbo')

const result = spawnSync(turbo, ['run', 'dev', `--filter=@repo/${feature}-*`], {
  stdio: 'inherit',
})

process.exit(result.status ?? 0)
