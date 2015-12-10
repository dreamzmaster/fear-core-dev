'use strict';
var argv = require('yargs').argv;

module.exports = {
    log: function() {
        var args = [].slice.call(arguments);
        /*eslint-disable no-console */
        console.log.apply(console, args);
        /*eslint-enable no-console */
    },

    get argv() {
        return argv;
    }

};