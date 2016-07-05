import ApiAbstract from './api-abstract';

class Api extends ApiAbstract {

    constructor(config) {
        super(config);
    }

    get() {

        return this.requestManager.get({
            url: 'http://someurl.com'
        });

    }

}

export default Api;