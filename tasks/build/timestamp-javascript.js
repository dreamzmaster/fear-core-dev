'use strict';

module.exports = function taskFactory (scriptsPath) {

    return function task () {

        var gulp = require('gulp');
        var header = require('gulp-header');
        var headerComment = '/*Generated on:' + new Date() + '*/';

        return gulp.src([scriptsPath + '/**/*.js'])
            .pipe(header(headerComment))
            .pipe(gulp.dest(scriptsPath));
    };
};
