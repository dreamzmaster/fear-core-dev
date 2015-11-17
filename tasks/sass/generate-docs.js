'use strict';

module.exports = function taskFactory (sourceFiles, destination) {

    return function task () {

        var sassdoc = require('sassdoc');

        var options = {
            'dest': destination,
            'package': './package.json',
            'theme': require('sassdoc-theme-mns')
        };

        return gulp
            .src(sourceFiles)
            .pipe(sassdoc(options));
    };
};
