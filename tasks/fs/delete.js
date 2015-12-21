'use strict';

/**
 * @module tasks/fs/delete
 */

/**
 * taskFactory
 * @param folder {String}
 * @returns task {Function}
 */
module.exports = function taskFactory (folder) {

    return function task () {

        var del = require('del');

        return del([folder + '/*.*']);
    };
};
