'use strict';

var gulp = require('gulp');

module.exports = function taskFactory (scriptsPath) {

    var uglify = require('gulp-uglify');

    return gulp.src([scriptsPath + '/packages/**/*.js'])
        .pipe(uglify({
            mangle: true
        }))
        .pipe(gulp.dest(scriptsPath + '/packages'));
};
