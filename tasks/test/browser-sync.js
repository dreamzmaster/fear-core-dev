'use strict';

/**
 * @module tasks/test/browser-sync
 */

/**
 * taskFactory
 * @param options {Object}
 * @returns {Function}
 * task
 */
module.exports = function(options) {

    return function task() {
        require('gulp');
        options = options || {};

        var browser = require('browser-sync').create(),
            proxy = options.proxy || 'http://localhost:8000/',
            page = options.page || 'hub';

        browser.init({ proxy: proxy + page });
    };

};
