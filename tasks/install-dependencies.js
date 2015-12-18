'use strict';

module.exports = function taskFactory () {

    return function task () {

        var execSync = require('child_process').execSync;

        execSync('npm install jspm@0.16.10; jspm install', {
            stdio: 'inherit'
        });
    };
};
