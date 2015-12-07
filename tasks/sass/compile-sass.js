'use strict';

module.exports = function taskFactory(files, autoPrefixOptions, destinations) {

    return function compile() {

        var gulp = require('gulp');
        var sass = require('gulp-sass');
        var sourceMaps = require('gulp-sourcemaps');
        var postCss = require('gulp-postcss');
        var autoPrefixer = require('autoprefixer');
        var bourbon = require('node-bourbon');
        var destinationsHelper = require('../helpers/build-destinations');

        var sassOptions = {
            includePaths: bourbon.includePaths,
            outputStyle: 'expanded',
            sourceComments: true,
            errLogToConsole: true
        };

        return gulp.src(files)
            .pipe(sourceMaps.init())
            .pipe(sass(sassOptions))
            .pipe(postCss([autoPrefixer(autoPrefixOptions)]))
            .pipe(sourceMaps.write('.'))
            .pipe(gulp.dest(function (file) {
                return destinationsHelper.getDestinations(destinations, file.path);
            }));
    };
};
