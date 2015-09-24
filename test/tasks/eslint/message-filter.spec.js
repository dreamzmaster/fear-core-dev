'use strict';

var filter = require('../../../tasks/eslint/message-filter');

var expect = require('chai').expect;

describe('eslint message filter', function () {

    /*

    valid result object from ESLint 1.3.x:

    {
        filePath: '/path/to/a/file.js',
        messages: [
          {
            ruleId: 'no-console',
            severity: 2,
            message: 'Unexpected console statement.',
            line: 19,
            column: 16,
            nodeType: 'MemberExpression',
            source: '               console.log(\'message\', message);'
          }
        ],
        errorCount: 0,
        warningCount: 0
    }
    */

    it('should always return a valid result object', function() {
        var result = {
            filePath: '/path/to/a/file.js',
            messages: []
        };
        var resultClone = JSON.parse(JSON.stringify(result));

        var filtered = filter(result);

        expect(filtered).to.have.property('filePath', resultClone.filePath);
        expect(filtered).to.have.property('messages');
        expect(filtered).to.have.property('errorCount');
        expect(filtered).to.have.property('warningCount');
    });

    it('should not alter message objects', function() {
        var result = {
            messages: [
                { a: 'message' }
            ]
        };
        var messageClone = JSON.parse(JSON.stringify(result.messages[0]));

        var filtered = filter(result);

        expect(filtered.messages[0]).to.deep.equal(messageClone);
    });

    describe('when the result object has messages', function () {

        describe('and no filter option is given', function () {

            it('should count the errors and warnings', function() {
                var result = {
                    messages: [
                        { severity: 2 },
                        { severity: 2 },

                        { severity: 1 }
                    ]
                };

                var filtered = filter(result);

                expect(filtered.errorCount).to.equal(2);
                expect(filtered.warningCount).to.equal(1);
            });

        });

        describe('and a specific rule is given', function () {

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

                        { ruleId: 'rule-causing-warning', severity: 1 }
                    ]
                };

                filtered = filter(result);

                expect(filtered.errorCount).to.equal(2);
                expect(filtered.warningCount).to.equal(1);

                filtered = filter(result, 'rule-turned-off');

                expect(filtered.errorCount).to.equal(0);
                expect(filtered.warningCount).to.equal(0);
            });

        });

        describe('and a specific keyword is given', function () {

            it('should only keep messages containing the expected keyword', function() {
                var result = {
                    messages: [
                        { message: 'containing the expected keyword' },
                        { message: 'not containing that keyword' }
                    ]
                };

                var filtered = filter(result, null, 'expected keyword');

                expect(filtered.messages.length).to.equal(1);

                var regex = new RegExp('expected keyword');
                expect(regex.test(filtered.messages[0].message)).to.be.true;
            });

            it('should count the errors and warnings', function() {
                var filtered;

                var result = {
                    messages: [
                        { message: 'error containing the expected keyword', severity: 2 },
                        { message: 'error containing the expected keyword', severity: 2 },

                        { message: 'warning containing the expected keyword', severity: 1 }
                    ]
                };

                filtered = filter(result, null, 'expected keyword');

                expect(filtered.errorCount).to.equal(2);
                expect(filtered.warningCount).to.equal(1);

                filtered = filter(result, null, 'non-existent keyword');

                expect(filtered.errorCount).to.equal(0);
                expect(filtered.warningCount).to.equal(0);
            });

        });

    });

});
