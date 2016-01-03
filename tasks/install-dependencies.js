'use strict';

/**
 * @module tasks/install-dependencies
 */

/**
 * taskFactory
 * @returns task {Function}
 */
module.exports = function taskFactory () {

    return function task () {

        var execSync = require('child_process').execSync;

        execSync('jspm install', {
            stdio: 'inherit'
        });
    };
};
