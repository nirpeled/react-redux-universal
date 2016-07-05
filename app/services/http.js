var superagent = require('superagent');

export function Http(url, method) {
    this._url = url;
    this._method = method || 'GET';
    this._query = {};
    this._body = null;
    this._files = [];
    this._headers = {};
}

Http.prototype = {

    method: function (method) {
        this._method = method;
        return this;
    },

    url: function (url) {
        this._url = url;
        return this;
    },

    query: function (query) {
        this._query = query;
        return this;
    },

    body: function (body) {
        this._body = body;
        return this;
    },

    file: function(file) {
        this._files.push(file);
        return this;
    },

    headers: function (headers) {
        this._headers = headers;
        return this;
    },

    send: function () {

        var self = this;

        if (this._method === 'GET' && this._headers) { //since there is no body in GET no content-type should be passed
            delete this._headers['content-type'];
        }

        var request = superagent(this._method, this._url);

        request.query(this._query);

        if (this._body && this._method !== 'GET') {
            request.send(this._body);
        }

        if (this._files.length && this._method === 'POST') {
            var file;
            delete this._headers['content-type'];
            for(var i in this._files) {
                file = this._files[i];
                request.attach(file.name, file.file);
            }
        }

        if(this._headers['content-type']) {
            request.type(this._headers['content-type']);
            delete this._headers['content-type'];
        }

        request.set(this._headers);

        return new Promise(function (resolve, reject) {

            request.end(function (error, response) {

                if (error && error.message === 'Origin is not allowed by Access-Control-Allow-Origin') {
                    console.log('error, response', self._url, error, response);
                }

                if (error) {

                    var errObj = {};

                    if (!response) {
                        errObj.statusCode = -1;
                        errObj.message = error.code || '';
                    } else {
                        errObj.statusCode = response.status;
                        errObj.message = response.body && response.body.errorCode !== 'undefined' ? response.body.errorCode : response.text;
                    }

                    reject(errObj);

                } else {

                    for(var prop in response.body) {
                        resolve(response.body);
                        return;
                    }

                    resolve(response.text);

                }

            });

        });

    }

};