'use strict';

var gulp = require('gulp');
var eslint = require('gulp-eslint');

module.exports = function taskFactory (src, bail) {

    return function task () {
        return gulp.src(src)
            .pipe(eslint())
            .pipe(eslint.format())
            .pipe(bail ? eslint.failOnError() : eslint.failAfterError());
    };

};
