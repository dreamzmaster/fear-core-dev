'use strict';

var filter = require('../../../../tasks/helper/linting/result-filter');

var expect = require('chai').expect;

describe('linting result filter', function () {

    describe('when provided with no result objects', function () {

        it('should return an empty array', function() {
            var results = [];

            var filtered = filter(results);

            expect(filtered).to.be.an.instanceof(Array);
            expect(filtered).to.be.empty;
        });

    });

});
