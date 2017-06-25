const path = require('path');
const webpack = require('webpack');
const root = require('./helper');

// Webpack Plugins
const CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const autoprefixer = require('autoprefixer');

module.exports = {
  // Start at the context path
  context: path.resolve(__dirname, '../src'),

  // Source maps
  devtool: 'source-map',

  // Entry points
  entry: {
    'polyfills': './polyfills.ts',
    'vendor': './vendor.ts',
    'app': './main.ts'
  },

  // Output
  output: {
    path: root('dist'),
    publicPath: '/',
    filename: 'js/[name].min.js'
  },

  // Discover files that have those extensions
  resolve: {
    extensions: ['.ts', '.js', '.json', '.css', '.scss', '.html'],
  },

  // Run these loaders
  module: {
    rules: [
      // Support for .ts files.
      {
        test: /\.ts$/,
        loaders: ['awesome-typescript-loader', 'angular2-template-loader'],
        exclude: [/\.(spec|e2e)\.ts$/, /node_modules\/(?!(ng2-.+))/]
      },

      // SASS in src/style will be bundled in an external css file
      {
        test: /\.(scss|sass)$/,
        exclude: root('src', 'app'),
        loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: ['css-loader', 'postcss-loader', 'sass-loader']})
      },

      // SASS required in src/app files will be merged in js files
      {test: /\.(scss|sass)$/, exclude: root('src', 'style'), loader: 'raw-loader!postcss-loader!sass-loader'},

      // Support for .html as raw text
      {test: /\.html$/, loader: 'raw-loader',  exclude: root('src', 'public')},

      // Support for *.json files.
      {test: /\.json$/, loader: 'json-loader'},

      // Support for Tslint
      {test: /\.ts$/, enforce: 'pre', loader: 'tslint-loader'}
    ]
  },

  // Use these plugins
  plugins: [
    // Environment helpers
    new webpack.DefinePlugin({
      'process.env': {
        ENV: JSON.stringify('production')
      }
    }),

    // Workaround needed for angular 2 angular/angular#11580
    new webpack.ContextReplacementPlugin(
      // The (\\|\/) piece accounts for path separators in *nix and Windows
      /angular(\\|\/)core(\\|\/)@angular/,
      root('./src') // location of your src
    ),

    // Split vendor code
    new CommonsChunkPlugin({
      name: ['vendor', 'polyfills']
    }),

    // Add script and link tags to index.html
    new HtmlWebpackPlugin({
      template: '../src/public/index.html',
      chunksSortMode: 'dependency'
    }),

    // Extract css files
    new ExtractTextPlugin({filename: 'css/[name].min.css', disable: false}),

    // Copy assets from the public folder
    new CopyWebpackPlugin([{
      from: root('src/public')
    }]),

    // Only emit files when there are no errors
    new webpack.NoEmitOnErrorsPlugin(),

    // Tslint configuration for webpack 2
    new webpack.LoaderOptionsPlugin({
      options: {
        tslint: {
          emitErrors: false,
          failOnHint: false
        },
        postcss: [
          autoprefixer({
            browsers: ['last 2 version']
          })
        ]
      }
    })
  ]
}
