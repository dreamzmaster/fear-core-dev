'use strict';

var gulp = require('gulp');
var watch = require('gulp-watch');
var batch = require('gulp-batch');
var runSequence = require('run-sequence');

module.exports = function taskFactory (src, tasks) {

    watch(src, batch(function (events, done) {
        runSequence.use(gulp);
        runSequence.apply(null, tasks.concat([ done ]));
    }));

};
