'use strict';

/**
 * @module tasks/test/webdriver-io
 */

/**
 * taskFactory
 * @param config {Object}
 * @returns {Function}
 * task
 */
module.exports = function(config) {
    var fs = require('fs'),
        path = require('path'),
        gulp = require('gulp'),
        webdriver = require('gulp-webdriver'),
        gutil = require('gulp-util'),
        seleniumPath = path.join(__dirname, './selenium');

    function finish() {
        process.exit(0);
    }

    function error() {
        process.exit(1);
    }

    function generateConfigFile(config) {
        var jsfy = require('jsfy');

        config.___selenium = seleniumPath;
        config.___before = config.before;

        config.before = function() {
            var self = this;
            var globals = Object.keys(self.globals);
            globals.forEach(function(key) {
                global[key] = self.globals[key];
            });
            this.___before && this.___before();
        };

        if(config.seleniumStandalone) {
            config.___onPrepare = config.onPrepare;
            config.___onComplete = config.onComplete;

            config.onPrepare = function() {
                var selenium = require(this.___selenium);
                this.___onPrepare && this.___onPrepare();
                return selenium.start();
            };

            config.onComplete = function() {
                var selenium = require(this.___selenium);
                selenium.stop();
                this.___onComplete && this.___onComplete();
            };
        }

        return 'exports.config = ' + jsfy(config) + ';\n';
    }

    function mkdir(path) {
        return new Promise(function(resolve, reject) {
            fs.stat(path, function(err, stat) {
                if(stat && stat.isDirectory()) {
                    gutil.log(gutil.colors.green(path + ' exists'));
                    resolve();
                }else {
                    fs.mkdir(path, function(err) {
                        err && reject(err);
                        !err && resolve();
                    });
                }
            });
        });
    }

    function writeFile(path, data) {
        return new Promise(function(resolve,reject) {
            fs.writeFile(path, data, function(err) {
                err && reject(err);
                !err && resolve();
            });
        });
    }

    function launchWebdriver(configPath) {
        // fix for https://github.com/webdriverio/gulp-webdriver/issues/20
        var options = { wdioBin: path.join(__dirname, '../../', 'node_modules', '.bin', 'wdio') };
        return gulp.src(configPath)
            .pipe(webdriver(options))
            .on('error', error)
            .on('finish', finish);
    }

    return function task() {
        var directoryPath = path.join(process.cwd(), './.tmp/'),
            configFilePath = directoryPath + 'test-visual-config.js';

        return mkdir(directoryPath)
            .then(function(){
                return writeFile(configFilePath, generateConfigFile(config));
            })
            .then(function() {
                return launchWebdriver(configFilePath);
            })
            .catch(function(ex) {
                gutil.log(gutil.colors.red(ex));
                error();
            });
    };
};
