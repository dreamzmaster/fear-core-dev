'use strict';

module.exports = {
    startKarmaServer: require('./tasks/start-karma-server'),
    startKarmaRunner: require('./tasks/start-karma-runner'),
    watch: require('./tasks/watch'),
    watchAndLintOnChange: require('./tasks/watch-and-lint-on-change'),
    testRunE2E: require('./tasks/test/run-e2e-tests'),
    karmaRunOnce: require('./tasks/test/karma-run-once'),
    browserSync: require('./tasks/test/browser-sync'),
    webdriverio : require('./tasks/test/webdriverio'),
    webdrivercss : require('./tasks/test/webdrivercss'),
    createAppConfig: require('./tasks/build/create-app-config'),
    generateSprites: require('./tasks/build/generate-sprites'),
    siteSpeed: require('./tasks/test/sitespeedio'),
    installDependencies: require('./tasks/build/install-dependencies'),
    config: require('./utils/config/index'),
    mocks : {
        copy: require('./tasks/mock/copy-mocks'),
        copyInline: require('./tasks/mock/copy-inline-mocks')
    },
    lint : {
        javascript: require('./tasks/eslint/details'),
        onChange: require('./tasks/eslint/on-change'),
        report: require('./tasks/eslint/report'),
        sassOnChange: require('./tasks/sass/lint-on-change')
    },
    fs : {
        remove: require('./tasks/fs/delete'),
        copy: require('./tasks/fs/copy')
    },
    javascript : {
        annotate: require('./tasks/build/javascript/annotate'),
        minify: require('./tasks/build/javascript/minify'),
        bundle: require('./tasks/build/javascript/package'),
        timestamp: require('./tasks/build/javascript/timestamp')
    },
    css : {
        minify: require('./tasks/build/css/minify'),
        inline: require('./tasks/build/css/inline')
    },
    html : {
        minify: require('./tasks/build/html/minify'),
        remove: require('./tasks/build/html/remove'),
        validate: require('./tasks/html/validate')
    },
    sass : {
        compile: require('./tasks/sass/compile-sass'),
        generateDocs: require('./tasks/sass/generate-docs')
    }
};
