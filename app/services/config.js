'use strict';

import _ from 'lodash';

class ConfigService {

    constructor() {
        this.config = {};
    }

    /**
     * @param config
     */
    init(config) {
        this.config = config || {};
    }

    /**
     * @param {String} key
     * @returns {Object}
     */
    get(key) {
        return this.config[key] || {};
    }

    /**
     * @returns {Object}
     */
    getClientConfig() {
        return _.pick(this.config, [
            'env', 'whipclip', 'mixpanel', 'facebook'
        ]);
    }
}

export default new ConfigService();
