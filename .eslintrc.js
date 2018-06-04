// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root:          true,
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
        config: './webpack.base.conf.js',
      },
    },
  },
  rules: {
    'key-spacing': ['warn', { align: 'value' }],
  },
  overrides: [
    {
      files: ['test/**'],
      rules: {
        'no-console': 'off',
      },
    },
    {
      files: ['demo/**'],
      env:   {
        browser: true,
      },
      rules: {
        'no-console':      'off',
        'no-multi-assign': 'off',
      },
    },
  ],
};
