var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');

var config = require('./webpack-config.js');
var port = process.env.HOT_LOAD_PORT || 8889;

new WebpackDevServer(webpack(config), {

    contentBase: 'http://localhost:' + port,
    publicPath: config.output.publicPath,
    noInfo: true,
    hot: true

}).listen(port, 'localhost', function(error) {

    if (error) {
        console.log(error);
    } else {
        console.log('Hot load server listening at localhost:' + port);
    }

});
