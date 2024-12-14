import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import importPlugin from 'eslint-plugin-import'

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    ignores: ['**/dist/*'],
  },
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      import: importPlugin,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],

      'import/no-restricted-paths': [
        'error',
        {
          zones: [
            {
              target: '@features',
              from: '@features/*/*',
              message:
                "Do not import directly from subdirectories within a feature. Use the index file instead (e.g., '@features/auth').",
            },
          ],
        },
      ],

      'no-unused-vars': 'warn',
      'no-console': 'error',
      'no-debugger': 'error',
      'no-dupe-keys': 'error',
      'no-extra-semi': 'error',
      'no-unreachable': 'error',
      'use-isnan': 'error',
      eqeqeq: 'error',
      'object-curly-spacing': ['error', 'always'],
      'arrow-spacing': 'error',
      'no-const-assign': 'error',
      'prefer-const': 'warn',
      'no-var': 'error',
      'object-shorthand': 'error',
      'no-loop-func': 'warn',
      'no-eval': 'error',
      'no-new-func': 'error',
      'no-return-assign': 'error',
      'no-throw-literal': 'error',
      'keyword-spacing': 'error',
      'space-before-blocks': 'error',
    },
  },
]
