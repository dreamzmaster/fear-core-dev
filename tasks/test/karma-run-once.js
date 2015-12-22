'use strict';

var karma, util;

/**
 * @module tasks/test/karma-run-once
 */

/**
 * taskFactory
 * @param config {Object}
 * @param done {Function}
 * @returns {Function}
 * task
 */
module.exports = function factory (config, done) {

    function loadDependencies () {
        karma = require('karma');
        util = require('gulp-util');
    }

    function karmaDone(exitCode) {
        process.exitCode = process.exitCode || exitCode;
        exitCode && util.log(util.colors.red('Karma exitcode: ', 1));
        done();
    }

    return function task() {

        loadDependencies();
        config.autoWatch = false;
        config.singleRun = true;
        var server = new karma.Server(config, karmaDone);
        server.start();
    };
};
