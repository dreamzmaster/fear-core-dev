'use strict';

var gulp = require('gulp');
var eslint = require('gulp-eslint');

module.exports = function registerTask () {

    gulp.task('lint-javascript', function () {
        return gulp.src(['*.js'])
            .pipe(eslint())
            .pipe(eslint.format())
            .pipe(eslint.failOnError());
    });

};
