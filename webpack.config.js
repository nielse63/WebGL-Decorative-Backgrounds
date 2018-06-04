const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const setPath = dir => path.resolve(__dirname, dir);

module.exports = {
  mode:    'production',
  resolve: {
    extensions: ['.js', '.json'],
  },
  entry: {
    demo1: './src/demo1.js',
  },
  output: {
    path:     setPath('demo'),
    filename: '[name]/demo.js',
  },
  module: {
    rules: [
      {
        test:    /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use:     {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use:  [
          {
            loader:  'file-loader',
            options: {
              name:            'images/[name].[ext]',
              useRelativePath: false,
            },
          },
          'img-loader',
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin([
      'demo/**/*.js',
    ]),
  ],
};
