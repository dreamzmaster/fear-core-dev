'use strict';

var watch = require('./watch');
var lintOnChange = require('./eslint/on-change');

/**
 * @module tasks/watch-and-lint-on-change
 */

/**
 * taskFactory
 * @param src
 * @returns task {Function}
 */
module.exports = function taskFactory (src) {
    return function task () {
        watch(src, [], lintOnChange);
    };
};
