'use strict';

/**
 * @module tasks/css
 */
module.exports = {

    /**
     * minify CSS
     * @see module:tasks/css/minify
     */
    minify: require('./minify'),

    /**
     * inline CSS in style tags
     * @see module:tasks/css/inline
     */
    inline: require('./inline')
};
