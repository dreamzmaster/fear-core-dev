'use strict';

var gulp = require('gulp');
var lint = require('./index').lintJavascript;
var runUnitTests = require('./index').runUnitTests;

var files = ['tasks/*.js', '*.js'];

gulp.task('lint', lint(files) );

gulp.task('run-unit-tests-once', runUnitTests({
    configFile: __dirname + '/karma.conf.js',
    files: [ 'test/**/*.spec.js' ]
}));

gulp.task('watch', function() {
    gulp.watch(files, ['lint']);
});
