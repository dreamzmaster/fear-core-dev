'use strict';

var gulp = require('gulp');
var log = require('gulp-util').log;
var eslint = require('gulp-eslint');
var chalk = require('chalk');

function populateRuleSummaryFrom (results) {

    var errors = results.filter(function (result) {
        return result.errorCount > 0;
    });

    var summary = {};

    errors.forEach(function (error) {
        error.messages.forEach(function (message) {
            var rule = message.ruleId;
            if (!summary[rule]) {
                summary[rule] = {
                    warnings: 0,
                    errors: 0
                };
            }
            if (message.severity===1) {
                summary[rule].warnings++;
            }
            if (message.severity===2) {
                summary[rule].errors++;
            }
        });
    });

    return summary;
}

function summaryReport (results) {

    var summary = populateRuleSummaryFrom(results);

    var errors = 0;
    var warnings = 0;

    for (var rule in summary) {
        if (summary.hasOwnProperty(rule)) {
            var issues = summary[rule];

            errors += issues.errors;
            warnings += issues.warnings;

            log('linting errors '+chalk.red(issues.errors)+' warnings '+chalk.yellow(issues.warnings)+' rule '+chalk.cyan(rule));
        }
    }

    return (errors+warnings) > 0 ? chalk.yellow('total linting errors ')+errors+chalk.yellow(' warnings ')+warnings : '';
}

module.exports = function taskFactory (src) {

    return function task () {
        return gulp.src(src)
            .pipe(eslint())
            .pipe(eslint.format(summaryReport));
    };

};
