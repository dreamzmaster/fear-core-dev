'use strict';

module.exports = function taskFactory () {

    return function task () {

        var gulp = require('gulp');
        var minifyCss = require('gulp-minify-css');

        return gulp.src('.tmp/css/**/*.css')
            .pipe(minifyCss())
            .pipe(gulp.dest('.tmp/css'));
    };
};
