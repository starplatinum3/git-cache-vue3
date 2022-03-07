module.exports = {
  // root: true,
  parserOptions: {
    parser: 'babel-eslint',
    "ecmaVersion": 7,
    "sourceType": "module"
  },
  // env: {
  //   browser: true,
  // },
  // extends: [
  //   // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
  //   // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
  //   'plugin:vue/essential',
  //   // https://github.com/standard/standard/blob/master/docs/RULES-en.md
  //   'standard'
  // ],
  // // required to lint *.vue files
  // plugins: [
  //   'vue'
  // ],
  // add your custom rules here
  rules: {
      "no-unused-vars": 'off',
      // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-console': 'off',
  },
  parser: "vue-eslint-parser",
  env: {
    browser: true,
    node: true,
    es6: true,
  },
//   rules: {
//     'no-console': 'off',
//   }

//   {
//     "parserOptions": {
//       "ecmaVersion": 7,
//       "sourceType": "module"
//     }
//   }
  

}

