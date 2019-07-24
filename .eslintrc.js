module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    // '@vue/airbnb',
    'airbnb-base',
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'class-methods-use-this': 'warn',
    "linebreak-style": [0 ,"error", "windows"], // 允许windows开发环境
    'arrow-parens':'off',
    'indent':'off',
    'no-restricted-syntax':'off',
    'no-trailing-spaces':'off',
    'vue/html-self-closing':'off',
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
};
