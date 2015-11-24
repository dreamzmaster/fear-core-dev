'use strict';

module.exports = function(config) {
    var fs = require('fs'),
        path = require('path'),
        gulp = require('gulp'),
        webdriver = require('gulp-webdriver'),
        gutil = require('gulp-util');

    function finish() {
        process.exit(0);
    }

    function error() {
        process.exit(1);
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

        return (config.filePath ?
            launchWebdriver(configFilePath) :
            mkdir(directoryPath)
            .then(function(){
                return writeFile(configFilePath, config.file);
            })
            .then(function() {
                return launchWebdriver(configFilePath);
            })
        )
        .catch(function(ex) {
            gutil.log(gutil.colors.red(ex));
            error();
        });
    };
};
