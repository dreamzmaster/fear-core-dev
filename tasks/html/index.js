'use strict';

/**
 * @module tasks/html
 */
module.exports = {

    /**
     * minify
     * @see module:tasks/html/minify
     */
    minify: require('./minify'),

    /**
     * remove HTML blocks
     * @see module:tasks/html/remove
     */
    remove: require('./remove'),

    /**
     * validate HTML
     * @see module:tasks/html/validate
     */
    validate: require('./validate')
};
