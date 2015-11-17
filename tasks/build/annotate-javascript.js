'use strict';

module.exports = function taskFactory (scriptsPath) {

    return function task () {

        var gulp = require('gulp');
        var ngAnnotate = require('gulp-ng-annotate');

        return gulp.src([scriptsPath + '/packages/**/*.js'])
            .pipe(ngAnnotate({
                add: true,
                single_quotes: true // eslint-disable-line camelcase
            }))
            .pipe(gulp.dest(scriptsPath + '/packages'));
    };
};
