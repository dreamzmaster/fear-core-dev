'use strict';

var runner = require('karma').runner;

module.exports = function taskFactory (config) {

    return function task (done) {
        runner.run(config, done);
    };

};
