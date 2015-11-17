'use strict';

var del = require('del');

module.exports = function taskFactory (foldersToDelete) {
    return del(foldersToDelete);
};
