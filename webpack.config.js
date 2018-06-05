const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const pkg = require('./package.json');

const env = process.env.NODE_ENV || 'development';
const isDev = env === 'development';
const mode = isDev ? env : 'production';
const setPath = dir => path.resolve(__dirname, dir);
const packageName = pkg.repository.split('/').pop()
  .replace(/-/g, ' ')
  .replace(/\.git/, '');
const backgrounds = Object.keys(pkg.dependencies).map((dep) => {
  const slug = dep.replace(/@nielse63\//, '');
  const lowercase = slug.replace(/webgl-/, '');
  return {
    lowercase,
    slug,
    capitalized: lowercase.replace(/\b\w/g, l => l.toUpperCase()),
  };
});
const links = backgrounds.map(({ lowercase, capitalized }) => ({
  href: `${lowercase}.html`,
  text: capitalized,
}));
const htmlTemplates = backgrounds
  .map(({ lowercase, capitalized, slug }) => new HtmlWebpackPlugin({
    filename: `${lowercase}.html`,
    template: 'src/sample.html',
    title:    `${capitalized} Demo | ${packageName}`,
    name:     capitalized,
    repo:     `https://github.com/nielse63/WebGL-Decorative-Backgrounds/tree/master/packages/${slug}`,
    links,
  }));

const config = {
  mode,
  resolve: {
    extensions: ['.js', '.json', '.scss'],
    alias:      {
      '@':       setPath('src'),
      $packages: setPath('packages'),
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

if (!isDev) {
  config.stats = {
    chunks: true,
  };
  config.optimization = {
    minimize:     true,
    runtimeChunk: {
      name: 'manifest',
    },
    splitChunks: {
      cacheGroups: {
        vendors: {
          test:   /node_modules/,
          name:   'vendors',
          chunks: 'all',
        },
        default: {
          priority:           -20,
          reuseExistingChunk: true,
        },
      },
    },
  };
}

module.exports = config;
