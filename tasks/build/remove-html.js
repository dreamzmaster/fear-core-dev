'use strict';

module.exports = function taskFactory (htmlFolder) {

    return function task () {

        var gulp = require('gulp');
        var removeCode = require('gulp-remove-code');

        var removeCodeOpts = {
            production: true
        };

        return gulp.src(htmlFolder + '/**/*.html')
            .pipe(removeCode(removeCodeOpts))
            .pipe(gulp.dest(htmlFolder));
    };
};
