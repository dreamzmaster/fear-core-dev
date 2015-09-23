'use strict';

var filter = require('../../../../tasks/helper/linting/result-filter');

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
