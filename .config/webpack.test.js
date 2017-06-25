const path = require('path');
const webpack = require('webpack');
const root = require('./helper');

// Webpack Plugins
const autoprefixer = require('autoprefixer');

module.exports = {
  // Inline source maps
  devtool: 'inline-source-map',

  // Empty output
  output: {},

  // Discover files that have those extensions
  resolve: {
    extensions: ['.ts', '.js', '.json', '.css', '.scss', '.html'],
  },

  // Use these loaders
  module: {
    rules: [
      // Support for .ts files.
      {
        test: /\.ts$/,
        loaders: ['awesome-typescript-loader?inlineSourceMap=true&sourceMap=false', 'angular2-template-loader', '@angularclass/hmr-loader'],
        exclude: [/\.(e2e)\.ts$/]
      },

      // Copy assets to output
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader?name=fonts/[name].[hash].[ext]?'
      },

      // Use 'null' loader in test mode (https://github.com/webpack/null-loader)
      {test: /\.(scss|sass)$/, exclude: root('src', 'app'), loader: 'null-loader'},

      // SASS required in src/app files will be merged in js files
      {test: /\.(scss|sass)$/, exclude: root('src', 'style'), loader: 'raw-loader!postcss-loader!sass-loader'},

      // support for .html as raw text
      {test: /\.html$/, loader: 'raw-loader',  exclude: root('src', 'public')},

      // Support for *.json files.
      {test: /\.json$/, loader: 'json-loader'}
    ]
  },

  plugins: [
    // Environment helpers
    new webpack.DefinePlugin({
      'process.env': {
        ENV: JSON.stringify('test')
      }
    }),

    // Workaround needed for angular 2 angular/angular#11580
    new webpack.ContextReplacementPlugin(
      // The (\\|\/) piece accounts for path separators in *nix and Windows
      /angular(\\|\/)core(\\|\/)@angular/,
      root('./src') // location of your src
    ),

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
};
