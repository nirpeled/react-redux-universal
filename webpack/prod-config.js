const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const port = process.env.HOT_LOAD_PORT || 8889;

/**
* source-map, It will add a .map file for you.
* That file is not actually loaded into the browser
* until the DevTools are brought up.
*/
module.exports = {
    entry: {
        app: [
            './app/client.js'
        ],
        vendor: [
            'react',
            'react-dom',
            'history',
            'react-router',
            'redux',
            'react-redux',
            'redux-thunk',
            'lodash',
            'query-string'
        ]
    },
    output: {
        path: path.join(__dirname, '../dist'),
        filename: 'application.js',
        publicPath: 'dist'
    },
    plugins: [
        new webpack.IgnorePlugin(/\.\/dev/, /\/config$/),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new webpack.optimize.CommonsChunkPlugin(/* chunkName= */'vendor', /* filename= */'vendor.bundle.js'),
        new ExtractTextPlugin('application.css', {
            allChunks: true
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"production"'
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
            {include: /\.json$/, loaders: ["json-loader"]},
            {
                test: /\.jsx?$/,
                loaders: ['babel?optional=runtime&stage=1'],
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
