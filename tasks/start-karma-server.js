'use strict';

var Server = require('karma').Server;

/**
 * @module tasks/start-karma-server
 */
module.exports = function taskFactory (config) {

    return function task (done) {
        var server = new Server(config, done);
        server.start();
    };

};
