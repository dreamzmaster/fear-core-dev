'use strict';

/**
 * @module tasks/javascript
 */
module.exports = {
    /**
     * ng-annotate AngularJS code to allow use of mangle:true in minification
     * @see module:tasks/javascript/annotate
     */
    annotate: require('./annotate'),
    /**
     * minify javascript
     * @see module:tasks/javascript/minify
     */
    minify: require('./minify'),
    /**
     * bundle javascript using JSPM
     * @see module:tasks/javascript/bundle
     */
    bundle: require('./bundle'),
    /**
     * timestamp javascript with time of build
     * @see module:tasks/javascript/timestamp
     */
    timestamp: require('./timestamp')
};
