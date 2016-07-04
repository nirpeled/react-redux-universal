import logger from './logger.js';
import safeStringify from './safe-stringify.js';
import localStorage from './local-storage.js';

class Helpers {

    constructor() {
        this.logger = logger;
        this.safeStringify = safeStringify;
        this.localStorage = localStorage;
    }
}

const helpers = new Helpers();

export default helpers;