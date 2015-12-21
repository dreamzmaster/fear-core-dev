'use strict';

/**
 * @module tasks/javascript
 */
module.exports = {
    /**
     * ng-annotate javascript
     * @see module:tasks/javascript/annotate
     */
    annotate: require('./annotate'),
    /**
     * minify javascript
     * @see module:tasks/javascript/minify
     */
    minify: require('./minify'),
    /**
     * bundle javascript
     * @see module:tasks/javascript/bundle
     */
    bundle: require('./bundle'),
    /**
     * timestamp javascript
     * @see module:tasks/javascript/timestamp
     */
    timestamp: require('./timestamp')
};
