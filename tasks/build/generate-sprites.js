'use strict';

module.exports = function taskFactory (imagesPath) {

    return function task () {

        var gulp = require('gulp');
        var gulpif = require('gulp-if');
        var sprity = require('sprity');

        //currently not working with windows
        if (process.platform === 'win32') {
            return;
        }

        return sprity.src({
            src: imagesPath + '/sprites/**/*.{png,jpg}',
            style: 'core/sass/_generated-sprites.scss',
            processor: 'sass',
            cssPath: imagesPath + '/generated/sprites/',
            split: true,
            margin: 0,
            dimension: [
                { ratio: 1, dpi: 72 },
                { ratio: 2, dpi: 192 },
                { ratio: 3, dpi: 250 }
            ]
        }).pipe(gulpif('*.png', gulp.dest(imagesPath + '/generated/sprites/'), gulp.dest('core/sass/helpers/')));
    };
};
