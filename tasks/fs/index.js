'use strict';

/**
 * @module tasks/fs
 */
module.exports = {

    /**
     * delete Files
     * @see module:tasks/fs/delete
     */
    remove: require('./delete'),

    /**
     * copy Files
     * @see module:tasks/fs/copy
     */
    copy: require('./copy')
};
