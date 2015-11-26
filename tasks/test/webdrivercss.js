'use strict';

var path = require('path');

module.exports = function (config) {
    var wdio = require('./webdriverio'),
        wcss = path.join(__dirname, '../../', 'node_modules', 'webdrivercss'),
        helperPath = path.join(__dirname, '../', 'helpers', 'webdriverio');

    return function task() {
        config.__webdrivercssPath = wcss;
        config.__helpers = helperPath;
        config.screenshotPath = './test-visual-results-fear/command-fail';

        config.plugins = {
            webdrivercss: {
                screenshotRoot: 'test-visual-results-fear',
                failedComparisonsRoot: 'test-visual-results-fear/diff',
                misMatchTolerance: 0.05,
                screenWidth: config.breakpoints
            }
        };

        config.before = function() {
            var webdrivercss = require(this.__webdrivercssPath),
                helpers = require(this.__helpers);
            webdrivercss.init(global.browser, global.browser.options.plugins.webdrivercss);
            helpers.initialize(global.browser);
        };

        return wdio(config)();
    };
};