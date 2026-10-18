// @ts-check
const react = require('@repo/eslint-config/react')
const astro = require('@repo/eslint-config/astro')

/** @type {import("eslint").Linter.Config[]} */
module.exports = [
  { ignores: ['**/dist/**', '**/.turbo/**', '**/storybook-static/**'] },
  ...react,
  ...astro,
]
