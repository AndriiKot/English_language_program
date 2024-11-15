'use strict';

import js from '@eslint/js';
import globals from 'globals';
import prettierPlugin from 'eslint-plugin-prettier';
import eslintConfigPrettier from 'eslint-config-prettier';

export default [
  {
    ignores: ['dist', 'node_modules', 'coverage', 'eslint.config.js'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2020,
      },
    },
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      ...prettierPlugin.configs.recommended.rules,
      ...eslintConfigPrettier.rules,
      'prefer-const': 'error',
      'max-lines': ['warn', { max: 124 }],
      'max-params': ['error', 3],
    },
  },
  js.configs.recommended,
  {
    files: ['**/*.{js,jsx}'],
  },
];
