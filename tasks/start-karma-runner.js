'use strict';

var runner = require('karma').runner;

/**
 * @module tasks/start-karma-runner
 */

/**
 * taskFactory
 * @param config {Object}
 * karma configuration object
 * {@link http://karma-runner.github.io/0.8/config/configuration-file.html}
 * @returns task {Function}
 */
module.exports = function taskFactory (config) {

    return function task (done) {
        runner.run(config, done);
    };

};
