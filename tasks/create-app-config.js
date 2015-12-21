'use strict';

/**
 * @module tasks/start-karma-runner
 */

/**
 * taskFactory
 * @param config {Object}
 * @param template
 * @param destination {Array/String} glob
 * @returns task {Function}
 */
module.exports = function taskFactory (config, template, destination) {

    return function task () {

        var gulp = require('gulp');
        var gutil = require('gulp-util');
        var Readable = require('stream').Readable,
            src = new Readable({
                objectMode: true
            }),
            content = template.replace('__JSON_CONFIG__', JSON.stringify(config));

        // create source file content
        src._read = function () {
            this.push(new gutil.File({
                cwd: '',
                base: '',
                path: 'config.js',
                contents: new Buffer(content)
            }));
            this.push(null);
        };

        // move file to destination
        return src
            .pipe(gulp.dest(destination));
    };
};
