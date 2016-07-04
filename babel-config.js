require('babel/register')({

    stage: 1,

    only: [
        'app',
        'webpack/server.js'
    ]

});
