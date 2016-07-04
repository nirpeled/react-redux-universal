import logger from './logger.js';
import safeStringify from './safe-stringify.js';

class Helpers {

    constructor() {
        this.logger = logger;
        this.safeStringify = safeStringify;
    }
}

const helpers = new Helpers();

export default helpers;