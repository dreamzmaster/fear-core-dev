'use strict';

var gulp = require('gulp');
var lint = require('./index').lintJavascript;
var lintReport = require('./index').lintReport;
var startKarmaServer = require('./index').startKarmaServer;
var startKarmaRunner = require('./index').startKarmaRunner;

var files = ['tasks/*.js', '*.js'];

gulp.task('lint', lint(files) );

gulp.task('lint-report', lintReport(files) );

gulp.task('run-unit-tests-once', startKarmaServer({
    configFile: __dirname + '/karma.conf.js',
    files: [ 'test/**/*.spec.js' ],
    singleRun: true
}));

gulp.task('start-karma-server', startKarmaServer({
    configFile: __dirname + '/karma.conf.js',
    files: [ 'test/**/*.spec.js' ]
}));

gulp.task('run-unit-tests', ['lint'], startKarmaRunner({
    configFile: __dirname + '/karma.conf.js'
}));

gulp.task('watch', function() {
    gulp.watch(files, ['run-unit-tests']);
});
