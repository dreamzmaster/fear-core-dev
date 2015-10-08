'use strict';

module.exports = {
    lintJavascript: require('./tasks/eslint/details'),
    lintOnChange: require('./tasks/eslint/on-change'),
    lintReport: require('./tasks/eslint/report'),
    startKarmaServer: require('./tasks/start-karma-server'),
    startKarmaRunner: require('./tasks/start-karma-runner'),
    watch: require('./tasks/watch'),
    watchAndLintOnChange: require('./tasks/watch-and-lint-on-change')
};
