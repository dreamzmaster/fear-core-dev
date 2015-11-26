'use strict';

module.exports = {
    initialize: function (browser) {
        this.commands(browser);
        this.chai();
    },

    commands: function(browser) {
        browser.addCommand('urlAndWaitForLoad', function(url) {
            return this.url(url)
                .waitForExist('.loader__spinner', 4000, true);
        });
    },

    chai: function() {
        var chai = require('chai');
        var chaiAsPromised = require('chai-as-promised');

        chai.should();
        chai.use(this.withinMisMatchTolerance);
        chai.use(chaiAsPromised);
        chaiAsPromised.transferPromiseness = global.browser.transferPromiseness;

        global.expect = chai.expect;
    },

    withinMisMatchTolerance: function (chai, utils) {

        var Assertion = chai.Assertion;

        var fileNameRegex = '/.*\/(.*).baseline.png|(?!.*\/)(.*).baseline.png';

        function isWithinMisMatchTolerance(failedTitles, resolutionItem) {
            for (var iCount = 0; iCount < resolutionItem.length; iCount++) {
                if (!resolutionItem[iCount].isWithinMisMatchTolerance) {

                    var regexResult = resolutionItem[iCount].baselinePath.match(fileNameRegex);

                    failedTitles.push(' \t ' + (regexResult[1] || regexResult[2]));
                }
            }
        }

        function getFailedTitles(res) {
            var failedTitles = [];

            for (var name in res) {
                if (res[name]) {
                    isWithinMisMatchTolerance(failedTitles, res[name]);
                }
            }

            return failedTitles;
        }

        utils.addProperty(Assertion.prototype, 'withinMisMatchTolerance', function () {

            var failedTitles = getFailedTitles(this._obj);
            var titleList = failedTitles.join(', \n');

            this.assert(
                failedTitles.length === 0
                , 'expected [ \n' + titleList + ' \n \t] to be within the mismatch tolerance'
                , 'expected [ \n' + titleList + ' \n \t] to not be within the mismatch tolerance'
                );
        });
    }
};
