'use strict';

module.exports = function taskFactory(files, autoPrefixOptions, destination) {

    return function compile() {

        var gulp = require('gulp');
        var sass = require('gulp-sass');
        var gulpIf = require('gulp-if');
        var sourcemaps = require('gulp-sourcemaps');
        var bourbon = require('node-bourbon');
        var autoprefixer = require('gulp-autoprefixer');

        var sassOptions = {
            includePaths: bourbon.includePaths,
            outputStyle: 'expanded',
            sourceComments: true,
            errLogToConsole: true
        };

        return gulp.src(files)
            .pipe(sourcemaps.init())
            .pipe(sass(sassOptions))
            .pipe(gulpIf(['*.css', '!*.map'], autoprefixer(autoPrefixOptions)))
            .pipe(sourcemaps.write('.'))
            .pipe(gulp.dest(destination));
    };
};
