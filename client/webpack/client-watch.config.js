const Webpack = require('webpack');
const Path = require('path');

const ROOT_PATH = Path.join(__dirname, '../');
const VERSION = require(Path.join(ROOT_PATH, './package.json')).version;

const ClientConfig = require('./client.config.js');

ClientConfig.devtool = 'source-map';
ClientConfig.debug = true;

ClientConfig.plugins = ClientConfig.plugins.concat([
  new Webpack.DefinePlugin({
    __VERSION__: JSON.stringify(VERSION),
    environment: JSON.stringify('dev')
  }),
  new Webpack.DefinePlugin({
    __CLIENT__: true,
    __SERVER__: false,
    'process.env': {
      'NODE_ENV': process.env.NODE_ENV ? JSON.stringify(process.env.NODE_ENV) : JSON.stringify('dev')
    }
  }),
  new Webpack.HotModuleReplacementPlugin()
]);

module.exports = ClientConfig;
