'use strict';

var gulp = require('gulp');
var header = require('gulp-header');
var headerComment = '/*Generated on:' + new Date() + '*/';

module.exports = function taskFactory (scriptsPath) {

    return gulp.src([scriptsPath + '/**/*.js'])
        .pipe(header(headerComment))
        .pipe(gulp.dest(scriptsPath));
};
