'use strict';

var filter = require('../../../tasks/eslint/message-filter');

var expect = require('chai').expect;

describe('eslint message filter', function () {

    describe('when a specific keyword is given', function () {

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
