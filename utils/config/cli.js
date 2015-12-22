'use strict';
var argv = require('yargs').argv;
var util = require('gulp-util');

module.exports = {

    debugLog: function(section) {
        var cli = this;
        return function logger(msg) {
            if(cli.env.NODE_DEBUG && cli.env.NODE_DEBUG.indexOf(section) > -1) {
                util.log(util.colors.green(msg));
            }
        };
    },

    get argv() {
        return argv;
    },

    get env() {
        return process.env;
    }

};