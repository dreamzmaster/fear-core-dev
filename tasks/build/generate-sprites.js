'use strict';

module.exports = function taskFactory () {

    return function task () {

        var gulp = require('gulp');
        var gulpif;
        var sprity;

        function loadSpriteDeps() {
            gulpif = require('gulp-if');
            sprity = require('sprity');
        }

        //currently not working with windows
        if (process.platform === 'win32') {
            return;
        }

        loadSpriteDeps();

        return sprity.src({
            src: 'app/assets/images/sprites/**/*.{png,jpg}',
            style: 'core/sass/_generated-sprites.scss',
            processor: 'sass',
            cssPath: '../../../assets/images/generated/sprites/',
            split: true,
            margin: 0,
            dimension: [
                { ratio: 1, dpi: 72},
                { ratio: 2, dpi: 192},
                { ratio: 3, dpi: 250}
            ]
        }).pipe(gulpif('*.png', gulp.dest('app/assets/images/generated/sprites/'), gulp.dest('core/sass/helpers/')));

    };
};
