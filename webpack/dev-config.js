const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const port = process.env.HOT_LOAD_PORT || 8889;

const config = {
    entry: {
        app: [
            'webpack-dev-server/client?http://localhost:' + port, // WebpackDevServer host and port
            'webpack/hot/only-dev-server',
            './app/client.js'
        ],
        vendor: [
            'react',
            'react-dom',
            'history',
            'react-router',
            'babel-core/polyfill.js',
            'redux',
            'react-redux',
            'redux-thunk',
            'redux-logger',
            'lodash',
            'query-string'
        ]
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: 'http://localhost:' + port + '/dist/'
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: 'vendor.bundle.js'
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new ExtractTextPlugin('application.css', {
            allChunks: true
        })
    ],
    devtool: 'source-map',
    resolve: {
        extensions: ['', '.js', '.jsx', '.scss', '.css', '.json'],
        fallback: path.join(__dirname, '../node_modules')
    },
    resolveLoader: { fallback: path.join(__dirname, '../node_modules') },
    module: {
        loaders: [
            {
                include: /\.json$/, loaders: ["json-loader"]
            },
            {
                test: /\.jsx?$/,
                loaders: ['react-hot', 'babel?optional=runtime&stage=1'],
                include: [
                    path.resolve(__dirname, '../app')
                ],
                noParse: /babel\-core\/browser\-polyfill/
            },
            {
                test: /traceur-runtime/,
                loader: 'imports?this=>window'
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style', 'css!autoprefixer?browsers=last 2 version', {publicPath: ''})
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('style', 'css?sourceMap!autoprefixer?browsers=last 2 version!sass?sourceMap', {publicPath: ''})
            },
            {
                test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&mimetype=application/font-woff&prefix=fonts'
            },
            {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&mimetype=application/octet-stream&prefix=fonts'
            },
            {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&mimetype=application/vnd.ms-fontobject&prefix=fonts'
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&mimetype=image/svg+xml&prefix=fonts'
            },
            {
                test: /\.png$/,
                loader: 'url?limit=100000&mimetype=image/png'
            },
            {
                test: /\.svg$/,
                loader: 'url?limit=100000&mimetype=image/svg+xml'
            },
            {
                test: /\.gif$/,
                loader: 'url?limit=100000&mimetype=image/gif'
            },
            {
                test: /\.jpg$/,
                loader: 'file'
            },
            {
                test: /\.swf$/,
                loader: 'file'
            }
        ]
    }
};

module.exports = config;
