const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const pkg = require('./package.json');

const setPath = dir => path.resolve(__dirname, dir);
const packageName = pkg.name.replace(/-/g, ' ');
const backgrounds = Object.keys(pkg.dependencies)
  .filter(dep => /^@nielse63/.test(dep) && !/-utils$/.test(dep))
  // .map(dep => dep.replace(/@nielse63\/webgl-/, ''))
  .map((dep) => {
    const slug = dep.replace(/@nielse63\//, '');
    const lowercase = dep.replace(/@nielse63\/webgl-/, '');
    return {
      slug,
      lowercase,
      capitalized: lowercase.replace(/\b\w/g, l => l.toUpperCase()),
    };
  });
const links = backgrounds.map(({ lowercase, capitalized }) => ({
  href: `${lowercase}.html`,
  text: capitalized,
}));
const htmlTemplates = backgrounds.map(({ lowercase, capitalized, slug }) => new HtmlWebpackPlugin({
  filename: `${lowercase}.html`,
  template: 'src/sample.html',
  title:    `${capitalized} Demo | ${packageName}`,
  name:     capitalized,
  repo:     `https://github.com/nielse63/WebGL-Decorative-Backgrounds/tree/master/packages/${slug}`,
  links,
}));
console.log(htmlTemplates);

module.exports = {
  mode:    'development',
  resolve: {
    extensions: ['.js', '.json', '.html', '.scss', '.css'],
    alias:      {
      '@': setPath('src'),
    },
  },
  entry: {
    main:    './src/js/main.js',
    samples: './src/js/samples.js',
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
        test: /\.s?[ac]ss$/,
        use:  [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    new CopyWebpackPlugin([
      {
        from:   setPath('src/images'),
        to:     setPath('dist/images'),
        ignore: ['.*'],
      },
    ]),
    new MiniCssExtractPlugin({
      filename: 'styles/[name].css',
    }),
    new HtmlWebpackPlugin({
      title:    packageName,
      filename: 'index.html',
      template: 'src/index.html',
      chunks:   ['main'],
      links,
    }),
  ].concat(htmlTemplates),
};
