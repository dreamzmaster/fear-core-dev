'use strict';

module.exports = function taskFactory (scriptsPath) {

    return function task () {

        var gulp = require('gulp');
        var uglify = require('gulp-uglify');

        return gulp.src([scriptsPath + '/packages/**/*.js'])
            .pipe(uglify({
                mangle: true
            }))
            .pipe(gulp.dest(scriptsPath + '/packages'));
    };
};
