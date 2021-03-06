'use strict';

var gulp = require('gulp');
var eslint = require('gulp-eslint');

var filterResults = require('./result-filter');

/**
 * @module tasks/eslint/details
 */

/**
 * taskFactory
 * @param src {Array}
 * @param bail {Boolean}
 * @returns task {Function}
 */
module.exports = function taskFactory (src, bail) {

    return function task () {
        return gulp.src(src)
            .pipe(eslint())
            .pipe(filterResults())
            .pipe(eslint.format())
            .pipe(bail ? eslint.failOnError() : eslint.failAfterError());
    };

};
