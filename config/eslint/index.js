// @ts-check
const tseslint = require('@typescript-eslint/eslint-plugin')
const tsParser = require('@typescript-eslint/parser')
const importPlugin = require('eslint-plugin-import')
const prettier = require('eslint-config-prettier')

/** @type {import("eslint").Linter.Config[]} */
module.exports = [
  {
    files: ['**/*.{ts,tsx,mts,cts}'],
    plugins: {
      '@typescript-eslint': tseslint,
      import: importPlugin,
    },
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    rules: {
      ...tseslint.configs['recommended'].rules,
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports' }],
      '@typescript-eslint/no-non-null-assertion': 'warn',
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],
      'import/no-duplicates': 'error',
      'no-console': ['warn', { allow: ['warn', 'error'] }],
    },
  },
  prettier,
]
