'use strict';

/**
 * @module tasks/html/minify
 */

/**
 * taskFactory
 * @param sources {Array}
 * glob
 * @param destinations {Array}
 * glob
 * @returns task {Function}
 */
module.exports = function taskFactory(sources, destinations) {

    return function task() {

        var gulp = require('gulp');
        var minifyHTML = require('gulp-minify-html');
        var minifyInline = require('gulp-minify-inline');
        var header = require('gulp-header');
        var headerCommentHTML = '<!-- Generated on:' + new Date() + ' -->';
        var destinationsHelper = require('../helpers/build-destinations');

        var minifyHtmlOpts = {
            comments: true,
            spare: true,
            empty: true,
            cdata: true,
            conditionals: true,
            quotes: true,
            loose: true
        };

        return gulp.src(sources)
            .pipe(minifyHTML(minifyHtmlOpts))
            .pipe(minifyInline({
                jsSelector: 'script.inline-minify',
                mangle: true
            }))
            .pipe(header(headerCommentHTML))
            .pipe(gulp.dest(function (file) {
                return destinationsHelper.getDestinations(destinations, file.path);
            }));
    };
};
