'use strict';

var gulp = require('gulp');
var protractor = require('gulp-protractor').protractor;

module.exports = function taskFactory (specs, breakpoint, channel, port, callback) {

    return function runProtractorTests () {

        function protractorError(error) {
            throw error;
        }

        function protractorEnd() {
            callback();
            process.exit(0);
        }

        return gulp.src(['./dummy'])
            .pipe(protractor({
                configFile: './node_modules/fear-core-tasks/defaults/protractor.conf.js',
                args : [
                    '--specs', specs,
                    '--params.breakpoint', breakpoint,
                    '--params.channel', channel,
                    '--params.baseUrl', 'http://0.0.0.0:' + port
                ]
            }))
            .on('error', protractorError)
            .on('end', protractorEnd);
    }
};
