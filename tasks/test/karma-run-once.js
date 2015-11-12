'use strict';

var karma;

module.exports = function factory (config, done) {

    function loadDependencies () {
        karma = require('karma');
    }

    return function runUnitTestsOnce () {

        loadDependencies();
        config.autoWatch = false;
        config.singleRun = true;
        var server = new karma.Server(config, done);
        server.start();
    };
};
