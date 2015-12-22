'use strict';

/**
 * @module tasks/sass
 */
module.exports = {

    /**
     * compile SASS to CSS
     * @see module:tasks/sass/compile
     */
    compile: require('./compile'),

    /**
     * generate SASS documentation
     * @TODO migrate to fear-core-ui
     * @see module:tasks/sass/generate-docs
     */
    generateDocs: require('./generate-docs')
};
