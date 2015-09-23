'use strict';

var filter = require('../../../../tasks/helper/linting/result-filter');
var messageFilter = require('../../../../tasks/helper/linting/message-filter');

var expect = require('chai').expect;

describe('linting result filter', function () {

    describe('when provided with at least one result object', function () {

        it('should return a subset of results using a filter', function() {

            var results = [
                { keep: true },
                { keep: true },
                { keep: false }
            ];

            function check (result) {
                return result.keep;
            }

            var filtered = filter(results, check);

            expect(filtered).to.have.length(2);
        });

        describe('and used with the linting message filter', function () {

            it('should return only results containing messages for a specific rule', function() {
                var results = [
                    {
                        messages: [
                            { ruleId: 'expected-rule'}
                        ]
                    },
                    {
                        messages: [
                            { ruleId: 'not-expected-rule'}
                        ]
                    }
                ];

                function check (result) {
                    var output = messageFilter(result, 'expected-rule');
                    return output.messages.length > 0;
                }

                var filtered = filter(results, check);

                expect(filtered).to.have.length(1);
            });

        });

    });

    describe('when provided with no result objects', function () {

        it('should return an empty array', function() {
            var results = [];

            function check (result) {
                return typeof result !== 'undefined';
            }

            var filtered = filter(results, check);

            expect(filtered).to.be.an.instanceof(Array);
            expect(filtered).to.be.empty;
        });

    });

});
