'use strict';

var gulp = require('gulp');
var watch = require('gulp-watch');
var batch = require('gulp-batch');

module.exports = function taskFactory (src, task) {

    watch(src, batch(function (events, done) {
        gulp.start(task, done);
    }));
};
