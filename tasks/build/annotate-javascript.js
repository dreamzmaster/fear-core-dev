'use strict';

var gulp = require('gulp');

module.exports = function taskFactory (scriptsPath) {

    var ngAnnotate = require('gulp-ng-annotate');

    return gulp.src([scriptsPath + '/packages/**/*.js'])
        .pipe(ngAnnotate({
            add: true,
            single_quotes: true // eslint-disable-line camelcase
        }))
        .pipe(gulp.dest(scriptsPath + '/packages'));
};
