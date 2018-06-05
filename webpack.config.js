// const fs = require('fs');
const path = require('path');
// const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const pkg = require('./package.json');

const setPath = dir => path.resolve(__dirname, dir);
const packageName = pkg.name.replace(/-/g, ' ');
const backgrounds = Object.keys(pkg.dependencies)
  .filter(dep => /^@nielse63/.test(dep) && !/-utils$/.test(dep))
  .map(dep => dep.replace(/@nielse63\/webgl-/, ''));
const htmlTemplates = backgrounds.map(background => new HtmlWebpackPlugin({
  filename: `${background}.html`,
  template: 'src/sample.html',
  chunks:   ['samples'],
  title:    `${background} Demo | ${packageName}`,
}));
const links = backgrounds.map(background => ({
  href: `${background}.html`,
  text: background,
}));

// create entries
// const packagesDir = setPath('packages');
// const entries = {};
// fs.readdirSync(packagesDir)
//   .filter(dir => /^webgl/.test(dir) && !/-utils$/.test(dir))
//   .map(dir => dir.replace(/webgl-/, ''))
//   .forEach((name) => {
//     entries[name] = `./packages/webgl-${name}/index.js`;
//   });


module.exports = {
  mode:    'development',
  resolve: {
    extensions: ['.js', '.json'],
    alias:      {
      '@': setPath('src'),
    },
  },
  // entry:  entries,
  entry: {
    main:    './src/js/main.js',
    samples: './src/js/samples.js',
    styles:  './src/styles/index.js',
  },
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
      {
        test: /\.scss$/,
        use:  [
          'style-loader',
          'css-loader',
          'postcss-loader',
          'sass-loader',
          // IN_DEV ? 'style-loader' : MiniCssExtractPlugin.loader,
          // 'css-loader',
          // 'postcss-loader',
          // 'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    // new CleanWebpackPlugin([
    //   'dist/',
    // ]),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: '[name].css',
    }),
    new HtmlWebpackPlugin({
      title:    packageName,
      filename: 'index.html',
      template: 'src/index.html',
      chunks:   ['main'],
      links,
    }),
    // new HtmlWebpackPlugin({
    //   filename: 'sample.html',
    //   template: 'src/sample.html',
    //   chunks:   ['samples'],
    // }),
  ].concat(htmlTemplates),
};
