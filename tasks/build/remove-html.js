'use strict';

var gulp = require('gulp');
var removeCode = require('gulp-remove-code');

module.exports = function taskFactory (htmlFolder) {

    var removeCodeOpts = {
        production: true
    };

    return gulp.src(htmlFolder + '/**/*.html')
        .pipe(removeCode(removeCodeOpts))
        .pipe(gulp.dest(htmlFolder));
};
