const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const setPath = dir => path.resolve(__dirname, dir);
const entries = {};
[1, 2, 3, 4, 5, 6].forEach((num) => {
  const name = `demo${num}`;
  entries[name] = `./src/${name}.js`;
});

module.exports = {
  mode:    'development',
  resolve: {
    extensions: ['.js', '.json'],
    alias:      {
      '@': setPath('src'),
    },
  },
  entry:  'demo/demo.js',
  // entry:  entries,
  output: {
    path:     setPath('demo'),
    filename: '[name]/demo.bundle.js',
    // filename: '[name]/demo.js',
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
              publicPath:      '../images/',
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
