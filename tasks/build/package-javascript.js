'use strict';

var gulp;
var gutil;
var rename;
var uglify;
var packagesHelper;
var jspm;

module.exports = function taskFactory(packageDestinationFolder, packagesConfig) {

    return function task(done) {

        function loadDependencies() {
            gulp = require('gulp');
            gutil = require('gulp-util');
            rename = require('gulp-rename');
            uglify = require('gulp-uglify');
            jspm = require('jspm');
            packagesHelper = require('../helpers/js-packages');
        }

        loadDependencies();

        gutil.log(gutil.colors.green(
            'Bundles being created for product',
            global.product,
            'on channels',
            global.channel
        ));

        function createBundle(bundleExpr) {

            var bundleFileDestination = packageDestinationFolder + '/' + bundleExpr.split(' ')[0] + '.js';

            return jspm.bundle(bundleExpr, bundleFileDestination, {
                sourceMaps: true,
                minify: false,
                mangle: false
            }).then(function () {
                return gutil.log(gutil.colors.green('Bundle created: ') + bundleFileDestination);
            }).catch(function (error) {
                gutil.log(gutil.colors.red('Bundle error: ') + bundleFileDestination);
                throw new Error(error);
            });
        }

        packagesHelper.initialise(packagesConfig);

        return Promise.all(packagesHelper.get(global.product, global.channel).map(createBundle))
            .then(function () {
                gulp.src(process.cwd() + '/node_modules/fear-core-tasks/defaults/jspm.conf.prod.js')
                    .pipe(rename('jspm.conf.js'))
                    .pipe(uglify({
                        mangle: true
                    }))
                    .pipe(gulp.dest(process.cwd() + '/.tmp/scripts'));
            })
            .catch(function (error) {
                gutil.log(gutil.colors.red('build-jspm: Error creating packages'));
                done(new Error(error));
            });
    };
};
