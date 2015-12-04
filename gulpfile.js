'use strict';

var gulp = require('gulp');
var mocha = require('gulp-mocha');
var lint = require('./index').lintJavascript;
var lintOnChange = require('./index').lintOnChange;
var lintReport = require('./index').lintReport;
var watch = require('./index').watch;
var watchAndLintOnChange = require('./index').watchAndLintOnChange;

var prod = ['tasks/**/*.js', '*.js', 'utils/**/*.js'];
var specs = ['test/**/*.spec.js'];
var all = prod.concat(specs);

gulp.task('lint', lint(all, true) );
gulp.task('lint-all', lint(all, false) );
gulp.task('lint-report', lintReport(all) );

gulp.task('test', function () {
    return gulp.src(specs, { read: false })
        .pipe(mocha({
            reporter: 'spec'
        }));
});

gulp.task('watch', function() {
    watch(all, ['test'], lintOnChange);
});

gulp.task('watch-and-lint', watchAndLintOnChange(all));
