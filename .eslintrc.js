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
      files: ['src/backgrounds/*.js'],
      rules: {
        'no-param-reassign': 'off',
      },
    },
  ],
};
