/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  root: true,
  extends: [
    'plugin:vue/recommended',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting',
  ],
  settings: {
    'import/core-modules': ['vue-router/auto-routes'],
  },
  globals: {
    process: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    'vue/no-v-html': 'off',
    'vue/multi-word-component-names': 'off',
  },
};
