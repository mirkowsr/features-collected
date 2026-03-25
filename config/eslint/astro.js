// @ts-check
const base = require('./index.js')
const astroPlugin = require('eslint-plugin-astro')
const astroParser = require('astro-eslint-parser')
const tsParser = require('@typescript-eslint/parser')

/** @type {import("eslint").Linter.Config[]} */
module.exports = [
  ...base,
  {
    files: ['**/*.astro'],
    plugins: {
      astro: astroPlugin,
    },
    languageOptions: {
      parser: astroParser,
      parserOptions: {
        parser: tsParser,
        extraFileExtensions: ['.astro'],
      },
    },
    rules: {
      ...astroPlugin.configs.recommended.rules,
      'astro/no-conflict-set-directives': 'error',
      'astro/no-unused-define-vars-in-style': 'error',
    },
  },
]
