'use strict';

/**
 * @module fear-core-dev
 */
module.exports = {
    /**
     * start karma server
     * @see module:tasks/start-karma-server
     */
    startKarmaServer: require('./tasks/start-karma-server'),

    /**
     * start karma runner
     * @see module:tasks/start-karma-runner
     */
    startKarmaRunner: require('./tasks/start-karma-runner'),

    /**
     * watch
     * @see module:tasks/watch
     */
    watch: require('./tasks/watch'),

    /**
     * watch and lint on change
     * @see module:tasks/watch-and-lint-on-change
     */
    watchAndLintOnChange: require('./tasks/watch-and-lint-on-change'),

    /**
     * mock data tasks
     * @see module:tasks/mocks
     */
    mocks : {
        copy: require('./tasks/mock/copy-mocks'),
        copyInline: require('./tasks/mock/copy-inline-mocks')
    },

    /**
     * lint tasks
     * @see module:tasks/lint
     */
    lint : {
        javascript: require('./tasks/eslint/details'),
        onChange: require('./tasks/eslint/on-change'),
        report: require('./tasks/eslint/report'),
        sassOnChange: require('./tasks/sass/lint-on-change')
    },

    /**
     * SASS tasks
     * @see module:tasks/sass
     */
    sass : require('./tasks/sass'),

    /**
     * Testing tasks
     * @see module:tasks/test
     */
    test : require('./tasks/test')
};
