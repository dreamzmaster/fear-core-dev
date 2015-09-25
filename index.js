'use strict';

module.exports = {
    lintJavascript: require('./tasks/eslint/details'),
    lintReport: require('./tasks/eslint/report'),
    startKarmaServer: require('./tasks/start-karma-server'),
    startKarmaRunner: require('./tasks/start-karma-runner'),
    watchAndLintOnChange: require('./tasks/watch-and-lint-on-change')
};
