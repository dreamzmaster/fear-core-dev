'use strict';

module.exports = function taskFactory (files, destination) {

    return function task () {

        var gulp = require('gulp');
        var flatten = require('gulp-flatten');

        return gulp.src(files)
            .pipe(flatten())
            .pipe(gulp.dest(destination));
    };
};
