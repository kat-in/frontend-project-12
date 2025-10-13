import js from '@eslint/js'
import globals from 'globals'
import pluginReact from 'eslint-plugin-react'
import stylistic from '@stylistic/eslint-plugin'
import { defineConfig } from 'eslint/config'

export default defineConfig({
  files: ['**/*.{js,mjs,cjs,jsx}'],
  plugins: {
    js,
    stylistic,
    react: pluginReact,
  },
  extends: [
    'js/recommended',
    stylistic.configs.recommended,
    pluginReact.configs.flat.recommended,
  ],
  languageOptions: {
    globals: globals.browser,
    parserOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      ecmaFeatures: {
        jsx: true,
      },
    },
  },
  settings: {
    react: { version: 'detect' },
  },
  ignores: [
    'dist/**',
    'build/**',
    'node_modules/**',
  ],
  rules: {
    '@stylistic/indent': ['error', 2], // отступы 2 пробела
    '@stylistic/comma-dangle': ['error', {
      arrays: 'always-multiline',
      objects: 'always-multiline',
      imports: 'always-multiline',
      exports: 'always-multiline',
      functions: 'never',
    }],
    '@stylistic/no-trailing-spaces': 'error',
    '@stylistic/eol-last': ['error', 'always'],
    '@stylistic/quotes': ['error', 'single'],
    '@stylistic/semi': ['error', 'never'],

    // Отключаем правила React, которые не нужны для современных версий React
    'react/react-in-jsx-scope': 'off',
    'react/jsx-uses-react': 'off',
    'react/prop-types': 'off',
  },
})
