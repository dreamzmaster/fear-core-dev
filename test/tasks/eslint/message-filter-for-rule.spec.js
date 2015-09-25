'use strict';

var filter = require('../../../tasks/eslint/message-filter');

var expect = require('chai').expect;

describe('eslint message filter', function () {

    describe('when a specific rule is given', function () {

        it('should only keep messages with the expected rule', function() {
            var result = {
                messages: [
                    { ruleId: 'expected-rule' },
                    { ruleId: 'not-expected-rule' }
                ]
            };
            var filtered = filter(result, 'expected-rule');

            expect(filtered.messages.length).to.equal(1);
            expect(filtered.messages[0].ruleId).to.equal('expected-rule');
        });

        it('should count the errors and warnings', function() {
            var filtered;

            var result = {
                messages: [
                    { ruleId: 'rule-causing-error', severity: 2 },
                    { ruleId: 'rule-causing-error', severity: 2 },

                    { ruleId: 'rule-causing-warning', severity: 1 },

                    { ruleId: 'another-rule-causing-error', severity: 2 },
                    { ruleId: 'another-rule-causing-warning', severity: 1 }
                ]
            };

            filtered = filter(result, 'rule-causing-error');

            expect(filtered.errorCount).to.equal(2);
            expect(filtered.warningCount).to.equal(0);

            filtered = filter(result, 'rule-causing-warning');

            expect(filtered.errorCount).to.equal(0);
            expect(filtered.warningCount).to.equal(1);

            filtered = filter(result, 'rule-turned-off');

            expect(filtered.errorCount).to.equal(0);
            expect(filtered.warningCount).to.equal(0);
        });

    });

});
