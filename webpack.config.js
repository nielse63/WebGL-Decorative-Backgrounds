const fs = require('fs');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const setPath = dir => path.resolve(__dirname, dir);

const packagesDir = setPath('packages');

// create entries
const entries = {};
fs.readdirSync(packagesDir)
  .filter(dir => /^webgl/.test(dir) && !/-utils$/.test(dir))
  .map(dir => dir.replace(/webgl-/, ''))
  .forEach((name) => {
    entries[name] = `./packages/webgl-${name}/index.js`;
  });


module.exports = {
  mode:    'development',
  resolve: {
    extensions: ['.js', '.json'],
    alias:      {
      '@': setPath('src'),
    },
  },
  entry:  entries,
  output: {
    path:     setPath('dist'),
    filename: 'js/[name].js',
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
              name:            '[name].[ext]',
              outputPath:      'images/',
              // publicPath:      '../images/',
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
      'dist/',
    ]),
  ],
};
