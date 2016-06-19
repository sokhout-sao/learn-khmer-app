const Webpack = require('webpack');

const WebpackHtmlPlugin = require('html-webpack-plugin');
const WebpackPolyfillsPlugin = require('webpack-polyfills-plugin');
const WebpackCompressionPlugin = require('compression-webpack-plugin');
const WebpackExtractTextPlugin = require('extract-text-webpack-plugin');
const WebpackClientCleanerPlugin = require('./plugins/cleaner-plugin');


const Path = require('path');

const ROOT_PATH = Path.join(__dirname, '../');
const SRC_PATH = Path.join(ROOT_PATH, 'src');
const VERSION = require(Path.join(ROOT_PATH, './package.json')).version;
const Config = require(Path.join(ROOT_PATH, 'config', (process.env.NODE_ENV || 'prod')));

module.exports = {
    target: 'web',
    cache: false,
    debug: true,
    devtool: 'hidden-source-map',
    entry: {
        module: ['babel-polyfill', Path.join(SRC_PATH, 'app.js')],
        common: ['react', 'react-router']
    },
    resolve: {
        root: SRC_PATH,
        extensions: ['', '.js'],
        modulesDirectories: ['node_modules', 'bower_components', 'src'],
        alias: {
            config: Path.join(ROOT_PATH, 'config', process.env.NOE_ENV || 'prod')
        }
    },
    output: {
        path: Path.join(ROOT_PATH, 'dist/public'),
        publicPath: '/',
        filename: 'js/[name].[hash].js',
        pathInfo: true
    },
    module: {
        loaders: [
            // JS with Babel
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    cacheDirectory: true,
                    preset: ['es2015', 'react']
                }
            },
            //static image resources
            {
                test: /\.(gif|png|jpe?g|svg|ico)$/i,
                loader: 'file',
                query: {
                    name: '[path]/[name].[ext]'
                }
            },
            //static audio resources
            {
                test: /\.(mp3|wav|ogg)$/i,
                loader: 'file',
                query: {
                    name: '[path]/[name].[ext]'
                }
            }
        ],
        postLoaders: [
            //
            {
                test: /\.js$/,
                loader: 'autopolyfiller',
                exclude: /autopolyfiller-loader/,
                query: {
                    browsers: ['ie >= 8']
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
          __CLIENT__: true,
          __SERVER__: false,
          'process.env': {
            'NODE_ENV': process.env.NODE_ENV ? JSON.stringify(process.env.NODE_ENV) : JSON.stringify('dev')
          }
        }),
        new WebpackExtractTextPlugin('css/[hash].css'),
        new WebpackPolyfillsPlugin(['matchMedia']),
        new Webpack.optimize.CommonsChunkPlugin('common', 'js/common.[hash].js'),
        new WebpackHtmlPlugin({
          inject: true,
          template: Path.join(ROOT_PATH, 'views/index.ejs'),
          filename: 'index.ejs',
          conf: Config,
          favicon: Path.join(ROOT_PATH, 'resources/favicons/favicon.ico')
        }),
        new Webpack.NoErrorsPlugin()
    ]
};
