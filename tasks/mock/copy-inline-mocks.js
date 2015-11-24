'use strict';

module.exports = function taskFactory (files, destination, key, inlineFileNameEnding) {

    return function task () {

        var flatten = require('gulp-flatten');
        var replace = require('gulp-replace');
        var rename = require('gulp-rename');
        var gulp = require('gulp');

        function formatJson() {

            var lazypipe = require('lazypipe'),
                jsonFormattingPatterns = require('./helper/mock-json-formatting-patterns');

            return lazypipe()
                .pipe(replace, jsonFormattingPatterns.lineEndings, '')
                .pipe(replace, jsonFormattingPatterns.doubleQuote, '\\\"');
        }

        var renameOpts = {
            extname: inlineFileNameEnding
        };

        return gulp.src(files)
            .pipe(formatJson()())
            .pipe(replace(/(.*)/, '{ \"' + key + '\" : \"$1\"}'))
            .pipe(flatten())
            .pipe(rename(renameOpts))
            .pipe(gulp.dest(destination));
    };
};
