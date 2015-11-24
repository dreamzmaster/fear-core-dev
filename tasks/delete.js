'use strict';

module.exports = function taskFactory (folder) {

    return function task () {

        var del = require('del');

        return del([folder + '/*.*']);
    };
};
