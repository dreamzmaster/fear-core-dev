'use strict';

var gulp = require('gulp');
var eslint = require('gulp-eslint');

var files = ['tasks/*.js', '*.js'];

gulp.task('lint', function () {
    return gulp.src(files)
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failOnError());
});

gulp.task('watch', function() {
    gulp.watch(files, ['lint']);
});

