'use strict';

function filter (result, ruleId) {
    var filtered = {
        messages: []
    };

    result.messages.forEach(function (message) {
        if (message.ruleId === ruleId) {
            filtered.messages.push(message);
        }
    });

    return filtered;
}

describe.only('linting result object filter', function () {

    describe('when provided with a result object', function () {

        describe('having no messages', function () {

            it('should return the original result object', function() {
                var result = {
                    messages: []
                };
                var filtered = filter(result);
                expect(filtered).to.eql(result);
            });

        });

        describe('having messages', function () {

            it('should only return messages with the expected ruleId', function() {
                var result = {
                    messages: [
                        { ruleId: 'expected-rule-id' },
                        { ruleId: 'not-expected-rule-id' }
                    ]
                };
                var messageClone = JSON.parse(JSON.stringify(result.messages[0]));

                var filtered = filter(result, 'expected-rule-id');

                expect(filtered.messages.length).to.equal(1);
                expect(filtered.messages[0].ruleId).to.equal('expected-rule-id');
                expect(filtered.messages[0]).to.deep.equal(messageClone);
            });

        });

    });

});
