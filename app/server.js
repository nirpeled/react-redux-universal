import _ from 'lodash';
import path from 'path';
import express from 'express';
import compression from 'compression';
import helpers from './helpers/helpers.js';
import configService from './services/config.js';
import defaultConfig from './config/default.js';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { RouterContext, match } from 'react-router';
import queryString from 'query-string';
import { Provider } from 'react-redux';
import routes from './routes.js';
import storeService from './store/store.js';

var app = express(),
    config;

app.set('whipclipEnv', process.env.whipclip_env || 'development');
app.use(compression());
app.use('/images', express.static(path.join(__dirname, '/images')));

if (app.get('whipclipEnv') === 'development') {
    let webPackServer = require('./webpack-route.js');
    app.use('/scripts', webPackServer);
    app.use('/css', webPackServer);
} else {
    app.use('/scripts', express.static(path.join(__dirname, '/../dist')));
    app.use('/css', express.static(path.join(__dirname, '/../dist')));
}

config = defaultConfig;

try {
    config = _.assign(config, require('./config/' + app.get('whipclipEnv')));
} catch(e) {
    console.log('config ' + app.get('whipclipEnv') + ' doesn\'t exist, worry not! reverting to default');
}

configService.init(config);

app.get('*', function (req, res, next) {

    storeService.init({});

    var html = [],
        htmlString,
        store = storeService.get(),
        dispatch = store.dispatch,
        query,
        component,
        initStore;

    html.push('<!DOCTYPE html>');

    match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {

        if (redirectLocation) {
            res.redirect(301, redirectLocation.pathname + redirectLocation.search);
        } else if (error) {
            res.status(500).send(error.message);
        } else if (renderProps == null) {
            res.status(404).send('Not found');
        } else {
            query = queryString.parse(_.trim(renderProps.location.search, '?'));
            component = renderProps.components[renderProps.components.length - 1];

            initStore = (component && component.WrappedComponent && component.WrappedComponent.initStore)
                ? component.WrappedComponent.initStore(dispatch, renderProps.params, query)
                : Promise.resolve();

            Promise.resolve(initStore).then(
                () => {
                    html.push(renderToString(<Provider store={store}><RouterContext {...renderProps} /></Provider>));

                    htmlString = html.join('\n')
                        .replace('__config = null', '__config = '+ helpers.safeStringify(configService.getClientConfig()))
                        .replace('__state = null', '__state = '+ helpers.safeStringify(store.getState()));

                    res.send(htmlString);
                }
            ).catch((error) => {

                if (app.get('whipclipEnv') !== 'production') {
                    res.status(500).send(`<pre>Internal Server Error 500\n${error.stack}</pre>`);
                } else {
                    res.status(500).send(`<pre>Internal Server Error 500</pre>`);
                }
            });
        }

    });

});

app.listen(3000);