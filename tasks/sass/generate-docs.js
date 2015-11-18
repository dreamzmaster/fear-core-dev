'use strict';

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
