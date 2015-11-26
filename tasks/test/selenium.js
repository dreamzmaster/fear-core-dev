'use strict';

var selenium = require('selenium-standalone');
var bluebirdPromise = require('bluebird');
bluebirdPromise.promisifyAll(selenium);

module.exports = {
    start: function() {
        return selenium.installAsync({
            // check for more recent versions of selenium here:
            // http://selenium-release.storage.googleapis.com/index.html
            version: '2.47.1',
            baseURL: 'http://selenium-release.storage.googleapis.com',
            drivers: {
                chrome: {
                    // check for more recent versions of chrome driver here:
                    // http://chromedriver.storage.googleapis.com/index.html
                    version: '2.20',
                    arch: process.arch,
                    baseURL: 'https://chromedriver.storage.googleapis.com'
                }
            },
            logger: function(message) {
                console.log(message);
            },
            progressCb: function(totalLength, progressLength) {
                process.stdout.write('Downloading drivers ' + Math.round(progressLength / totalLength * 100) + '% \r');
            }
        }).then(function() {
            console.log('Starting selenium');

            return selenium.startAsync().then(function(child) {
                selenium.child = child;
                console.log('Selenium started');
            });
        });
    },

    stop: function() {
        selenium.child.kill();
        console.log('\nSelenium process ended. Test suite complete');
    }
};