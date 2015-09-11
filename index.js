'use strict';

module.exports = {
    lintJavascript: require('./tasks/lint-javascript'),
    lintReport: require('./tasks/lint-report'),
    startKarmaServer: require('./tasks/start-karma-server'),
    startKarmaRunner: require('./tasks/start-karma-runner')
};
