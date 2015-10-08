'use strict';

var gulp = require('gulp');
var watch = require('gulp-watch');
var batch = require('gulp-batch');
var runSequence = require('run-sequence');

module.exports = function taskFactory (src, tasks, runFirstOnChanged) {

    watch(src, { verbose: true }, batch(function (events, done) {

        var files = [];
        events._list.forEach(function (file) {
            files.push(file.path);
        });

        var all = tasks.concat([ done ]);

        if (typeof runFirstOnChanged === 'function') {
            gulp.task('run-on-changed-files-first', function () {
                return runFirstOnChanged(files);
            });
            all = ['run-on-changed-files-first'].concat(all);
        }

        runSequence.use(gulp);
        runSequence.apply(null, all);
    }));

};
