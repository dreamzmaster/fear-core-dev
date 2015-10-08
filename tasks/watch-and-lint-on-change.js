'use strict';

var watch = require('./watch');
var lintOnChange = require('./eslint/on-change');

module.exports = function taskFactory (src) {
    return function task () {
        watch(src, [], lintOnChange);
    };
};
