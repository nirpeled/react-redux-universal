import Api from './api.js';

export default {

    instance: null,

    init: function(config) {
        this.instance = new Api(config);
    }

};