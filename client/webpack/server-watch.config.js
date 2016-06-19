const Webpack = require('webpack');

const ServerConfig = require('./server.config.js');

const Path = require('path');
const ROOT_PATH = Path.join(__dirname, '../');

const VERSION = require(Path.join(ROOT_PATH, './package.json')).version;

ServerConfig.debug = true;
ServerConfig.devtool = 'source-map';
ServerConfig.entry.unshift('webpack/hot/poll?1000');

ServerConfig.plugins = [
  new Webpack.DefinePlugin({
    __VERSION__: JSON.stringify(VERSION),
    environment: JSON.stringify('dev')
  }),
  new Webpack.DefinePlugin({
    __CLIENT__: false,
    __SERVER__: true,
    'process.env': {
      'NODE_ENV': process.env.NODE_ENV ? JSON.stringify(process.env.NODE_ENV) : JSON.stringify('dev')
    }
  }),
  new Webpack.BannerPlugin(
    'require(\'source-map-suppport\').install()',
    {
      raw: true,
      entryOnly: false
    }
  ),
  new Webpack.DefinePlugin({
    __CLIENT__: false,
    __SERVER__: true,
    __PRODUCTION__: false,
    __DEV__: true
  }),
  new Webpack.HotModuleReplacementPlugin(),
  new Webpack.NoErrorsPlugin()
];
