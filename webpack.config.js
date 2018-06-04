const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const setPath = dir => path.resolve(__dirname, dir);
const entries = {
  demo: './src/demo/demo.js',
};
['brain', 'cubes', 'network', 'quantum', 'sphere', 'waves'].forEach((name) => {
  entries[name] = `./src/demo/${name}.js`;
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
    path: setPath('docs'),
    filename({ chunk }) {
      const { name } = chunk;
      if (name === 'demo') {
        return 'demo.bundle.js';
      }
      return '[name]/bundle.js';
    },
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
      'docs/**/*.js',
    ]),
  ],
};
