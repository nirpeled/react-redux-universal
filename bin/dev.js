require('./babel-config.js');
require('./server.js');

var path = require('path');
var nodemon = require('nodemon');

var monitor = nodemon({
    "execMap": {
        "js": "node -r " + path.join(__dirname, 'babel-config.js')
    },
    script: 'app/server.js',
    ext: 'js jsx html scss',
    watch: [
        'app'
    ],
    verbose: true
});

console.log('\u001b[32m[nodemon] App started\u001b[39m');

nodemon.on('restart', function (files) {
    console.log('\u001b[33m[nodemon] App restarted due to: ', files, '\u001b[39m');
});

process.once('SIGINT', function() {
    console.log('\u001b[32m[nodemon] App quiting...\u001b[39m');
    monitor.once('exit', function() {
        process.exit();
    });
});