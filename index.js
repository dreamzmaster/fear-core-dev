'use strict';

/**
 * @module fear-core-tasks
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
     * file system tasks
     * @see module:tasks/javascript
     */
    fs : {
        remove: require('./tasks/fs/delete'),
        copy: require('./tasks/fs/copy')
    },

    /**
     * javascript tasks
     * @see module:tasks/javascript
     */
    javascript : require('./tasks/javascript'),

    /**
     * CSS tasks
     * @see module:tasks/css
     */
    css : {
        minify: require('./tasks/css/minify'),
        inline: require('./tasks/css/inline')
    },

    /**
     * HTML tasks
     * @see module:tasks/html
     */
    html : {
        minify: require('./tasks/html/minify'),
        remove: require('./tasks/html/remove'),
        validate: require('./tasks/html/validate')
    },

    /**
     * SASS tasks
     * @see module:tasks/sass
     */
    sass : {
        compile: require('./tasks/sass/compile'),
        generateDocs: require('./tasks/sass/generate-docs')
    },

    testRunE2E: require('./tasks/test/run-e2e-tests'),
    karmaRunOnce: require('./tasks/test/karma-run-once'),
    browserSync: require('./tasks/test/browser-sync'),
    webdriverio : require('./tasks/test/webdriverio'),
    webdrivercss : require('./tasks/test/webdrivercss'),
    createAppConfig: require('./tasks/create-app-config'),
    generateSprites: require('./tasks/generate-sprites'),
    siteSpeed: require('./tasks/test/sitespeedio'),
    installDependencies: require('./tasks/install-dependencies'),
    config: require('./utils/config/index')
};
