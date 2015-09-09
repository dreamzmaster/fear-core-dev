'use strict';

var CLIEngine = require('eslint').CLIEngine;
var chalk = require('chalk');

function getErrorsForRule(name, options, files) {

    var config = {
        envs: ['browser'],
        useEslintrc: false,
        rules: {}
    };

    config.rules[name] = options;

    var cli = new CLIEngine(config);
    var report = cli.executeOnFiles(files);
    var errors = CLIEngine.getErrorResults(report.results);

    return errors;
}

module.exports = function lintReport(files) {

    // populate rules from project's .eslintrc
    var cli = new CLIEngine({ useEslintrc:true });
    var config = cli.getConfigForFile();
    var rules = config.rules;

    var failedRules = [];

    // run linting with each rule
    for (var name in rules) {
        if (rules.hasOwnProperty(name)) {
            var options = rules[name];
            var errors = getErrorsForRule(name, options, files);
            if (errors.length > 0) {
                failedRules.push({
                    name: name,
                    errors: errors
                });
            }
        }
    }

    // create and show a report
    if (failedRules.length) {
        failedRules.forEach(function (failedRule) {
            console.log(chalk.cyan('linting rule ')+chalk.red(failedRule.name)+' failed', failedRule.errors.length, 'time(s)');
        });
    }
};
