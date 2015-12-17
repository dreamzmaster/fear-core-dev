'use strict';
var argv = require('yargs').argv;
var util = require('gulp-util');

module.exports = {

    debugLog: function(section) {
        return function logger(msg) {
            if(this.env.NODE_DEBUG && this.env.NODE_DEBUG.indexOf(section) > -1) {
                util.log(util.colors.gren(msg));
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