module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 13,
  },
  plugins: [
    '@typescript-eslint',
  ],
  rules: {
    semi: 0,
    curly: 0,
    "no-tabs": 0,
    "arrow-parens": 0,
    "comma-dangle": 0,
    "no-unused-expressions": 0,
    'no-console': 0,
    "import/no-unresolved": 0,
    "import/extensions": 0,
    "indent": 0,
    "prefer-arrow-callback": 0,
    'linebreak-style': 0,
    "func-names": 0
  },
};
