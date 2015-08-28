'use strict';

var gulp = require('gulp');
var lint = require('./index').lintJavascript;

var files = ['tasks/*.js', '*.js'];

gulp.task('lint', lint(files) );

gulp.task('watch', function() {
    gulp.watch(files, ['lint']);
});
