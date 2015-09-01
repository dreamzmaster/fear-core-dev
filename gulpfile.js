'use strict';

var gulp = require('gulp');
var lint = require('./index').lintJavascript;
var startKarmaServer = require('./index').startKarmaServer;

var files = ['tasks/*.js', '*.js'];

gulp.task('lint', lint(files) );

gulp.task('run-unit-tests-once', startKarmaServer({
    configFile: __dirname + '/karma.conf.js',
    files: [ 'test/**/*.spec.js' ],
    singleRun: true
}));

gulp.task('watch', function() {
    gulp.watch(files, ['lint']);
});
