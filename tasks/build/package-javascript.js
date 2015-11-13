'use strict';

var gutil = require('gulp-util');

module.exports = function taskFactory (packageDestinationFolder, done) {

    var jspm = require('jspm'),
        packagesHelper = require(process.cwd() + '/node_modules/fear-core-tasks/tasks/helpers/js-packages');

    gutil.log(gutil.colors.green(
        'Bundles being created for product',
        global.product,
        'on channels',
        global.channel
    ));

    function createBundle(bundleExpr) {

        var bundleFileDestination = packageDestinationFolder + '/' + bundleExpr.split(' ')[0] + '.js';

        return jspm.bundle(bundleExpr, bundleFileDestination, {
            sourceMaps  : true,
            minify      : false,
            mangle      : false
        }).then(function () {
            return gutil.log(gutil.colors.green('Bundle created : ') + bundleFileDestination);
        }).catch(function (error) {
            gutil.log(gutil.colors.red('Bundle error: ') + bundleFileDestination);
            throw new Error(error);
        });
    }

    Promise.all(packagesHelper.get(global.product, global.channel).map(createBundle))
        .then(function () {
            done();
        })
        .catch(function (error) {
            gutil.log(gutil.colors.red('build-jspm: Error creating packages'));
            done(new Error(error));
        });
};
