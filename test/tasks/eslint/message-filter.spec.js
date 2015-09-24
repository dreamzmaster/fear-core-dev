'use strict';

var filter = require('../../../tasks/eslint/message-filter');

var expect = require('chai').expect;

describe('linting message filter', function () {

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

    describe('when provided with a result object', function () {

        describe('with at least one message', function () {

            describe('and a rule id', function () {

                it('should only return messages with the expected ruleId', function() {
                    var result = {
                        messages: [
                            { ruleId: 'expected-rule-id' },
                            { ruleId: 'not-expected-rule-id' }
                        ]
                    };
                    var filtered = filter(result, 'expected-rule-id');

                    expect(filtered.messages.length).to.equal(1);
                    expect(filtered.messages[0].ruleId).to.equal('expected-rule-id');
                });

            });

            it('should count the errors and warnings', function() {
                var result;
                var filtered;

                result = {
                    messages: [
                        { ruleId: 'rule-error', severity: 2 },
                        { ruleId: 'rule-error', severity: 2 },
                        { ruleId: 'rule-error', severity: 2 },

                        { ruleId: 'rule-warning', severity: 1 },
                        { ruleId: 'rule-warning', severity: 1 }
                    ]
                };

                filtered = filter(result, 'rule-error');

                expect(filtered.errorCount).to.equal(3);
                expect(filtered.warningCount).to.equal(0);

                filtered = filter(result, 'rule-warning');

                expect(filtered.errorCount).to.equal(0);
                expect(filtered.warningCount).to.equal(2);

                filtered = filter(result, 'rule-turned-off');

                expect(filtered.errorCount).to.equal(0);
                expect(filtered.warningCount).to.equal(0);
            });

        });

    });

});
