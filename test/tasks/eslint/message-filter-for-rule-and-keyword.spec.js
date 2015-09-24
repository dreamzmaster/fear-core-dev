'use strict';

var filter = require('../../../tasks/eslint/message-filter');

var expect = require('chai').expect;

describe('eslint message filter', function () {

    describe('when a specific keyword and also a rule is given', function () {

        it('should only keep messages containing the expected keyword and rule', function() {
            var result = {
                messages: [
                    {   message: 'containing the expected keyword',
                        ruleId: 'some-other-rule' },

                    {   message: 'containing the expected keyword',
                        ruleId: 'expected-rule' },

                    {   message: 'not containing that keyword',
                        ruleId: 'expected-rule' }
                ]
            };

            var filtered = filter(result, 'expected-rule', 'expected keyword');

            expect(filtered.messages.length).to.equal(1);

            var regex = new RegExp('expected keyword');
            expect(regex.test(filtered.messages[0].message)).to.be.true;

            expect(filtered.messages[0].ruleId).to.equal('expected-rule');
        });

        it('should count the errors and warnings', function() {
            var filtered;

            var result = {
                messages: [
                    {   message: 'error containing the expected keyword',
                        ruleId: 'some-other-rule',
                        severity: 2 },

                    {   message: 'error containing the expected keyword',
                        ruleId: 'expected-rule',
                        severity: 2 },

                    {   message: 'warning containing the expected keyword',
                        ruleId: 'expected-rule',
                        severity: 1 },

                    {   message: 'warning not containing the specific keyword',
                        ruleId: 'expected-rule',
                        severity: 1 }
                ]
            };

            filtered = filter(result, 'expected-rule', 'expected keyword');

            expect(filtered.errorCount).to.equal(1);
            expect(filtered.warningCount).to.equal(1);

            filtered = filter(result, 'expected-rule', 'non-expected keyword');

            expect(filtered.errorCount).to.equal(0);
            expect(filtered.warningCount).to.equal(0);

            filtered = filter(result, 'not-expected-rule', 'expected keyword');

            expect(filtered.errorCount).to.equal(0);
            expect(filtered.warningCount).to.equal(0);

            filtered = filter(result, 'not-expected-rule', 'non-expected keyword');

            expect(filtered.errorCount).to.equal(0);
            expect(filtered.warningCount).to.equal(0);
        });

    });

});
