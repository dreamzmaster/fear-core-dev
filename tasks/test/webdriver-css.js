'use strict';

var path = require('path'),
    wdio = require('./webdriver-io'),
    extend = require('extend');

/**
 * @module tasks/test/webdriver-css
 */

/**
 * taskFactory
 * @param config {Object}
 * @returns {Function}
 * task
 */
module.exports = function (config) {
    var wdcssPath = path.join(__dirname, '../../', 'node_modules', 'webdrivercss'),
        helperPath = path.join(__dirname, '../', 'helpers', 'webdriverio'),
        screenshotPath = './test-visual-results-fear/command-fail',
        wdcss = {
            screenshotRoot: 'test-visual-results-fear',
            failedComparisonsRoot: 'test-visual-results-fear/diff',
            misMatchTolerance: 0.05
        };

    return function task() {
        config.__webdrivercssPath = wdcssPath;
        config.__helpers = helperPath;

        config.plugins = config.plugins || {};
        config.screenshotPath = config.screenshotPath || screenshotPath;

        config.plugins.webdrivercss = extend(
            config.plugins.webdrivercss || {},
            wdcss
        );

        config.before = function() {
            var webdrivercss = require(this.__webdrivercssPath),
                helpers = require(this.__helpers);
            webdrivercss.init(global.browser, global.browser.options.plugins.webdrivercss);
            helpers.initialize(global.browser);
        };

        return wdio(config)();
    };
};
