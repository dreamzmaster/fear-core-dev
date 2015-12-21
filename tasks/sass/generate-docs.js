'use strict';

/**
 * @module tasks/sass/generate-docs
 */

/**
 * taskFactory
 * @param config {Object}
 * karma configuration object {@link http://karma-runner.github.io/0.8/config/configuration-file.html}
 * @returns task {Function}
 */
module.exports = function taskFactory (sourceFiles, destination) {

    return function task () {

        var sassdoc = require('sassdoc');
        var gulp = require('gulp');

        var options = {
            'dest': destination,
            'package': './package.json',
            'theme': require('sassdoc-theme-mns')
        };

        return gulp.src(sourceFiles)
            .pipe(sassdoc(options));
    };
};
