module.exports = {
  root: true,
  parser: 'vue-eslint-parser',
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    // parser: '@typescript-eslint/parser'
  },
  extends: [
    '@nuxtjs',
    '@nuxtjs/eslint-config-typescript',
    'plugin:nuxt/recommended',
    'plugin:prettier/recommended',
    'prettier',
    'prettier/vue'
  ],
  plugins: [
    'prettier'
  ],
  // add your custom rules here
  rules: {
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'error',
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    "vue/singleline-html-element-content-newline": "off",
    "vue/no-v-html": "off",
    "vue/html-closing-bracket-spacing": "off",
    "vue/max-attributes-per-line": [2, {
      "singleline": 5,
      "multiline": {
        "max": 1,
        "allowFirstLine": false
      }
    }]
  }
}