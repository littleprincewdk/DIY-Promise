module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
  },
  plugins: ['@typescript-eslint', 'prettier'],
  extends: [
    'airbnb-base',
    'plugin:import/typescript',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'prettier/@typescript-eslint',
  ],
  globals: {
    document: 'readonly',
    MutationObserver: 'readonly',
    WebKitMutationObserver: 'readonly'
  },
  rules: {
    'prettier/prettier': 'error',
    'no-console': 'off',
    'max-len': ['error', 80],
    'no-new': 'off',
    'no-underscore-dangle': 'off',
    'linebreak-style': 'off',
    'no-unused-expressions': 'off',
    'func-names': 'off',
    'class-methods-use-this': 'off',
    'prefer-destructuring': ['error', { object: true, array: false }],
    '@typescript-eslint/indent': ['error', 2],
    '@typescript-eslint/camelcase': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/explicit-member-accessibility': [
      'error',
      {
        accessibility: 'explicit',
        overrides: {
          accessors: 'explicit',
          constructors: 'no-public',
          methods: 'off',
          properties: 'off',
          parameterProperties: 'explicit',
        },
      },
    ],
    'import/no-cycle': 'off',
  },
};
