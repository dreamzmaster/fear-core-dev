'use strict';

module.exports = function taskFactory (files, autoPrefixOptions, destination) {

    return function compile () {

        var gulp = require('gulp');
        var sass = require('gulp-sass');
        var bourbon = require('node-bourbon');
        var autoprefixer = require('gulp-autoprefixer');

        return gulp.src(files)
            .pipe(sass({
                includePaths: bourbon.includePaths,
                outputStyle: 'compressed'
            }))
            .pipe(autoprefixer(autoPrefixOptions))
            .pipe(gulp.dest(destination));
    };
};
