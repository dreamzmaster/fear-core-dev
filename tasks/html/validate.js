'use strict';

/**
 * @module tasks/html/validate
 */

/**
 * taskFactory
 * @param basePath
 * @param teams
 * @returns task {Function}
 */
module.exports = function(basePath, teams) {

    return function task(done) {

        var gutil = require('gulp-util');
        var childProcess = require('child_process');
        var phantomPath = require('phantomjs').path;
        var w3cjs = require('w3cjs');
        var path = require('path');
        var dir = require('node-dir');
        var pages = [];

        var counter = 0,
            totalErrors = 0;


        function formatMessage(obj, done) {
            for (var x = 0; x < obj.length; x++) {
                if (obj[x].type === 'error') {
                    gutil.log(gutil.colors.red('Error at line: ') + gutil.colors.blue(obj[x].lastLine) + ' ' + obj[x].message);
                    totalErrors++;
                }
            }

            counter++;
            if (counter === pages.length) {
                if (totalErrors > 0) {
                    gutil.log(gutil.colors.red('\nTotal W3C Errors: ') + totalErrors + gutil.colors.red(' in ') + pages.length + gutil.colors.red(' pages'));
                    done();
                } else {
                    done();
                }
            }
        }

        function openPage(childArgs, done) {

            var pageName = childArgs[1];

            gutil.log(gutil.colors.green('Analysing Page: ') + pageName);

            childProcess.execFile(phantomPath, childArgs, {
                timeout: 60000
            }, function(err, stdout, stderr) {

                if (stderr) {
                    gutil.log(gutil.colors.red('Error getting headless data for \'%s\' (stderr): %s: ' + stderr));
                }

                if (err) {
                    gutil.log(gutil.colors.red('Error analysing page: ') + pageName);
                    gutil.log(gutil.colors.red(err));
                }

                w3cjs.validate({
                    input: stdout, // file can either be a local file or a remote file
                    output: 'json', // Defaults to 'json', other option includes html
                    doctype: 'HTML5',
                    charset: 'utf-8',
                    callback: function(res) {
                        gutil.log(gutil.colors.cyan('\n--------- W3C analysis for ' + gutil.colors.green(pageName) + ' ---------'));
                        formatMessage(res.messages, done);
                    }
                });
            });
        }

        function openPages(pages) {

            for (var x = 0; x < pages.length; x++) {
                var childArgs = [
                    path.join(__dirname, 'phantomjs-script.js'),
                    pages[x]
                ];

                openPage(childArgs, done, x);
            }
        }

        function getAllPages(basePath, teams) {

            if (global.argv.page !== undefined) {
                openPages(pages.push(global.argv.page));
            } else {
                var counter = 0;

                for (var team in teams) {
                    if (teams.hasOwnProperty(team)) {
                        var dirPath = path.resolve(basePath + '../../../' + teams[team].views + '/default/pages'); //directory path
                        dir.readFiles(dirPath, {
                            match: /index.html/,
                            exclude: /^\./
                        }, function(err, content, next) {
                            if (err) {
                                throw err;
                            }
                            next();
                        },
                        function(err, files) {
                            if (err) {
                                throw err;
                            }
                            for (var i = 0; i < files.length; i++) {
                                pages.push(files[i].split('views/default/pages')[1].split('/index.html')[0]);
                            }
                            counter++;

                            if (counter === Object.keys(teams).length) {
                                openPages(pages);
                            }
                        });
                    }
                }
            }
        }

        getAllPages(basePath, teams);
    };
};
