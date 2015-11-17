'use strict';

module.exports = function taskFactory (foldersToDelete) {

    var del = require('del');

    return function task () {
        return del(foldersToDelete);
    };
};
