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
     * @see module:tasks/sass/annotate
     */
    generateDocs: require('./generate-docs')
};
