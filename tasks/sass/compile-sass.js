'use strict';

module.exports = function taskFactory(files, autoPrefixOptions, destination, includePaths) {

    return function compile() {

        var gulp = require('gulp');
        var sass = require('gulp-sass');
        var sourcemaps = require('gulp-sourcemaps');
        var postcss = require('gulp-postcss');
        var autoprefixer = require('autoprefixer');

        var sassOptions = {
            includePaths: includePaths || [],
            outputStyle: 'expanded',
            sourceComments: true,
            errLogToConsole: true
        };

        return gulp.src(files)
            .pipe(sourcemaps.init())
            .pipe(sass(sassOptions))
            .pipe(postcss([autoprefixer(autoPrefixOptions)]))
            .pipe(sourcemaps.write('.'))
            .pipe(gulp.dest(destination));
    };
};
