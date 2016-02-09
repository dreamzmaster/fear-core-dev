'use strict';

/**
 * @module tasks/test
 */
module.exports = {

    /**
     * Browser sync
     * @see module:tasks/test/browser-sync
     */
    browserSync: require('./browser-sync'),

    /**
     * Run Karma once
     * @see module:tasks/test/karma-run-once
     */
    karmaRunOnce: require('./karma-run-once')
};
