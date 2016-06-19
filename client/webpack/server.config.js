'use strict';

const Webpack = require('webpack');
const WebpackHtmlPlugin = require('html-webpack-plugin');
const WebpackPolyfillsPlugin = require('webpack-polyfills-plugin');
const WebpackExtractTextPlugin = require('extract-text-webpack-plugin');

const FileSystem = require('fs');

const Path = require('path');

const ROOT_PATH = Path.join(__dirname, '../');
const SRC_PATH = Path.join(ROOT_PATH, 'src');
const TMP_PATH = Path.join(ROOT_PATH, 'tmp');

const VERSION = require(Path.join(ROOT_PATH, './package.json')).version;

const nodeModules = {};
FileSystem.readdirSync('node_modules')
.filter(function(file) {
  console.log('filtering node_modules:', file)
  return ['.bin'].indexOf(file) === -1;
})
.forEach(function(moduleName) {
  nodeModules[moduleName] = 'commonjs ' + moduleName;
});

module.exports = {
  target: 'node',
  cache: false,
  externals: nodeModules,
  devtool: 'hidden-source-map',
  entry: ['babel-polyfill', Path.join(SRC_PATH, 'server/server.js')],
  resolve: {
    root: ROOT_PATH,
    extensions: ['', '.js', '.json'],
    alias: {
      config: Path.join(SRC_PATH, 'config', process.env.NODE_ENV || 'prod')
    }
  },
  output: {
    path: Path.join(ROOT_PATH, 'dist/server'),
    publicPath: '/',
    filename: 'server.js',
    pathInfo: true
  },
  module: {
    noParse: /\.min\.js$/,
    loaders: [
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          cacheDirectory: true,
          presets: ['es2015', 'react']
        }
      },
      {
        test: /\.(scss|css)$/,
        loader: WebpackExtractTextPlugin.extract('style', 'css!sass')
      },
      {
        test: /\.(gif|png|jpe?g|svg|ico)$/i,
        loader: 'file',
        query: {
          name: '[path]/[name].[ext]'
        }
      }
    ]
  },
  plugins: [
    new Webpack.DefinePlugin({
      __VERSION__: JSON.stringify(VERSION),
      environment: JSON.stringify('prod')
    }),
    new Webpack.DefinePlugin({
      __CLIENT__: false,
      __SERVER__: true,
      'process.env': {
        'NODE_ENV': process.env.NODE_ENV ? JSON.stringify( process.env.NODE_ENV) : JSON.stringify('prod')
      }
    })
  ]
};
