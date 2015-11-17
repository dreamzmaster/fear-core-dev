'use strict';

module.exports = function taskFactory (htmlFolder) {

    return function task () {

        var gulp = require('gulp');
        var minifyHTML = require('gulp-minify-html');
        var minifyInline = require('gulp-minify-inline');
        var header = require('gulp-header');
        var headerCommentHTML = '<!-- Generated on:' + new Date() + ' -->';

        var htmlViews = [
            htmlFolder + '/**/*.html',
            //exclude index.html files as WCS has to process these line by line
            '!' + htmlFolder + '/**/index.html'
        ];

        var minifyHtmlOpts = {
            comments: true,
            spare: true,
            empty: true,
            cdata: true,
            conditionals: true,
            quotes: true,
            loose: true
        };

        return gulp.src(htmlViews)
            .pipe(minifyHTML(minifyHtmlOpts))
            .pipe(minifyInline({
                jsSelector: 'script.inline-minify',
                mangle: true
            }))
            .pipe(header(headerCommentHTML))
            .pipe(gulp.dest(htmlFolder));
    };
};
