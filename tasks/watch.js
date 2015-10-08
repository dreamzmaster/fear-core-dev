'use strict';

var gulp = require('gulp');
var watch = require('gulp-watch');
var batch = require('gulp-batch');
var runSequence = require('run-sequence');

module.exports = function taskFactory (src, runOnChanged, tasks) {

    watch(src, { verbose: true }, batch(function (events, done) {

        var files = [];
        events._list.forEach(function (file) {
            files.push(file.path);
        });

        gulp.task('run-on-changed-files', function () {
            return runOnChanged(files);
        });

        var all = ['run-on-changed-files'].concat(tasks.concat([ done ]));

        runSequence.use(gulp);
        runSequence.apply(null, all);
    }));

};
