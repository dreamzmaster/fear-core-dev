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
    karmaRunOnce: require('./karma-run-once'),

    /**
     * Run end to end tests
     * @see module:tasks/test/run-e2e-tests
     */
    testRunE2E: require('./run-e2e-tests'),

    /**
     * Run sitespeed tests
     * @see module:tasks/test/sitespeed-io
     */
    siteSpeed: require('./sitespeed-io'),

    /**
     * Webdriver CSS visual regression tests
     * @see module:tasks/test/webdriver-css
     */
    webdriverCSS: require('./webdriver-css'),

    /**
     * Webdriver IO
     * @see module:tasks/test/webdriver-io
     */
    webdriverIO: require('./webdriver-io')
};
