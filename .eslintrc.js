// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root:          true,
  parser:        'babel-eslint',
  parserOptions: {
    ecmaVersion: 2017,
    sourceType:  'module',
  },
  env: {
    browser: true,
  },
  extends: [
    'airbnb-base',
    'plugin:monorepo/recommended',
  ],
  settings: {
    'import/resolver': {
      webpack: {
        config: './webpack.config.js',
      },
    },
  },
  rules: {
    'key-spacing': ['warn', { align: 'value' }],
  },
  overrides: [
    {
      files: ['packages/**/*.js'],
      rules: {
        'no-param-reassign': 'off',
      },
    },
  ],
};
