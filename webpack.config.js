'use strict';

// Modules
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var ngAnnotatePlugin = require('ng-annotate-webpack-plugin');
var path = require('path');

/**
 * Env
 * Get npm lifecycle event to identify the environment
 * Example: When the `npm run build` command is executed, the ENV will be set to `build`
 */
var ENV = process.env.npm_lifecycle_event;
var isProd = ENV === 'build';

module.exports = function makeWebpackConfig() {
  /**
   * Config
   * Reference: http://webpack.github.io/docs/configuration.html
   * This is the object where all configuration gets set
   */
  var config = {
    devtool: isProd ? 'source-map' : 'eval-source-map',

    entry: {
      app: './src/app.js'
    },

    output: {
      // Absolute output directory
      path: __dirname + '/dist',

      // Output path from the view of the page
      // Uses webpack-dev-server in development
      publicPath: isProd ? '/' : 'http://localhost:8080/',

      // Filename for entry points
      // Only adds hash in build mode
      filename: isProd ? '[name].[hash].js' : '[name].bundle.js',

      // Filename for non-entry points
      // Only adds hash in build mode
      chunkFilename: isProd ? '[name].[hash].js' : '[name].bundle.js'
    },

    resolve: {
      root: [path.resolve(__dirname, 'src/app')],
      extensions: ['', '.js']
    },

    module: {
      preLoaders: [
        {
          test: /\.js$/,
          loader: "eslint-loader?{rules:{semi:0}}",
          exclude: /node_modules/
        }
      ],

      loaders: [
        {
          test: /\.js$/,
          loader: 'babel',
          exclude: /node_modules/
        },
        {
          test: /\.scss|.css$/,
          loader: ExtractTextPlugin.extract('style', 'css?sourceMap!sass!postcss')
        },
        {
          test: /\.(png|jpg|jpeg|gif)$/,
          loader: 'file'
        },
        {
          test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
          loader: "url?limit=10000&mimetype=application/font-woff"
        }, {
          test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
          loader: "url?limit=10000&mimetype=application/font-woff"
        }, {
          test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
          loader: "url?limit=10000&mimetype=application/octet-stream"
        }, {
          test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
          loader: "file"
        }, {
          test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
          loader: "url?limit=10000&mimetype=image/svg+xml"
        },
        {
          test: /\.html$/,
          loader: 'raw'
        }
      ]
    },

    plugins: [
      new ngAnnotatePlugin({
        add: true
      }),
      new HtmlWebpackPlugin({
        template: './src/index.html',
        inject: 'body'
      }),
      new ExtractTextPlugin('[name].[hash].css', {disable: !isProd})
    ],

    postcss: [
      autoprefixer({
        browsers: ['last 2 version']
      })
    ],

    eslint: {
      configFile: './.eslintrc',
      failOnWarning: false,
      failOnError: true
    },

    devServer: {
      contentBase: './src',
      stats: 'minimal'
    }
  };

  // Add build specific plugins
  if (isProd) {
    config.plugins.push(
      new webpack.NoErrorsPlugin(),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin(),
      new CopyWebpackPlugin([{
        from: __dirname + '/src/resources',
        to: 'resources'
      }])
    )
  }

  return config;
}();
