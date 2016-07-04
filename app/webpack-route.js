/**
 * Proxy all requests through to the webpack server
 */

const express = require('express');
const request = require('request');
const router = express.Router();
const port = process.env.HOT_LOAD_PORT || 8889;
const webpackServerUrl = `http://localhost:${port}/dist`;

router.get('/*', function webpackDevServerProxy(req, res) {
    request(webpackServerUrl.concat(req.url)).pipe(res);
});

module.exports = router;
