import _ from 'lodash';

export function RequestManager(config) {

    config = config || {};

    //if (!config.baseUrl) {
    //    throw new Error('config.baseUrl is required!');
    //}
    //
    //if (!config.http) {
    //    throw new Error('config.http is required!');
    //}

    this.baseUrl = config.baseUrl;
    this.query = config.query || {};
    this.headers = _.assign({'content-type': 'application/json'}, config.headers || {});
    this.http = config.http;
    this.jsonMapper = config.jsonMapper;

}

RequestManager.prototype = {

    setHeader: function(name, value) {
        this.headers[name] = value;
        return this;
    },

    getHeader: function(name) {
        return this.headers[name];
    },

    removeHeader: function(name) {
        this.setHeader(name, null);
        return this;
    },

    setHttp: function(http) {
        this.http = http;
        return this;
    },

    commonRequest: function(options) {

        var that = this,
            url = options.url || that.baseUrl + options.path,
            request = new that.http(url, options.method);

        request.query(that.filterEmptyProperties(_.assign({}, that.query, options.query || {})));

        request.headers(that.filterEmptyProperties(_.assign({}, that.headers, options.headers || {})));

        if (options.body) {
            request.body(that.filterEmptyProperties(_.assign({}, options.body || {})));
        }

        if (options.file) {
            request.file(options.file);
        }

        return new Promise(function (resolve, reject) {
            request.send().then(function (data) {
                //data = options.dataFilter instanceof Function ? options.dataFilter(data) : data;
                //resolve(options.constructor ? that.jsonMapper.build(options.constructor, data) : data);
                // TODO: consider using jsonMapper for complex JS objects
                resolve(data);
            }, function (error) {
                reject(error);
            });
        });

    },

    filterEmptyProperties: function (obj) {

        var filteredObj = {};

        for (var prop in obj) {
            var value = obj[prop];
            if (value !== undefined && value !== null) {
                filteredObj[prop] = value;
            }
        }

        return filteredObj;

    },

    get: function (options) {
        options.method = 'GET';
        return this.commonRequest(options);
    },

    post: function (options) {
        options.method = 'POST';
        return this.commonRequest(options);
    },

    put: function (options) {
        options.method = 'PUT';
        return this.commonRequest(options);
    },

    del: function (options) {
        options.method = 'DELETE';
        return this.commonRequest(options);
    }

};