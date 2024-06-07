const eslintPluginTypeScript = require('@typescript-eslint/eslint-plugin');
const eslintPluginReact = require('eslint-plugin-react');
const eslintPluginImport = require('eslint-plugin-import');
const eslintPluginJsxA11y = require('eslint-plugin-jsx-a11y');
const eslintPluginReactHooks = require('eslint-plugin-react-hooks');

module.exports =[
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    ignores: ['node_modules/**'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      ecmaFeatures: {
        jsx: true,
      },
    },
    parserOptions: {
      "ecmaVersion": "latest",
      "ecmaFeatures": {
          "jsx": true,
          "ts": true
      },
      "sourceType": "module"
  },
    plugins: {
      '@typescript-eslint': eslintPluginTypeScript,
      'react': eslintPluginReact,
      'import': eslintPluginImport,
      'jsx-a11y': eslintPluginJsxA11y,
      'react-hooks': eslintPluginReactHooks,
    },
    rules: {
      'indent': ['error', 2],
      'quotes': ['error', 'single'],
      'semi': ['error', 'always'],
      'react/function-component-definition': [
        'error',
        {
          namedComponents: 'arrow-function',
          unnamedComponents: 'arrow-function',
        },
      ],
      'no-param-reassign': [
        'error',
        {
          props: true,
          ignorePropertyModificationsFor: ['state', 'draft'],
        },
      ],
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: '@typescript-eslint/parser',
    },
    extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:react/recommended',
      'airbnb',
    ],
  },
];
