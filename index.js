'use strict';

module.exports = {
    lintJavascript: require('./tasks/eslint/details'),
    lintOnChange: require('./tasks/eslint/on-change'),
    lintReport: require('./tasks/eslint/report'),
    lintSassOnChange: require('./tasks/sass/lint-on-change'),
    startKarmaServer: require('./tasks/start-karma-server'),
    startKarmaRunner: require('./tasks/start-karma-runner'),
    watch: require('./tasks/watch'),
    watchAndLintOnChange: require('./tasks/watch-and-lint-on-change'),
    testRunE2E : require('./tasks/test/run-e2e-tests'),
    karmaRunOnce : require('./tasks/test/karma-run-once'),
    annotateJavascript : require('./tasks/build/annotate-javascript'),
    minifyJavascript : require('./tasks/build/minify-javascript'),
    packageJavascript : require('./tasks/build/package-javascript'),
    timestampJavascript : require('./tasks/build/timestamp-javascript'),
    minifyCss : require('./tasks/build/minify-css'),
    inlineCss : require('./tasks/build/inline-css'),
    minifyHtml : require('./tasks/build/minify-html'),
    removeHtml : require('./tasks/build/remove-html'),
    buildSetup : require('./tasks/build/setup'),
    copy : require('./tasks/build/copy'),
    createAppConfig : require('./tasks/build/create-app-config'),
    generateSprites : require('./tasks/build/generate-sprites')
};
