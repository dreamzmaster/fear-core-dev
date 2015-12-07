'use strict';

var helper = require('../../tasks/helpers/build-destinations');
var expect = require('chai').expect;

describe('gulp destinations helper', function () {

    it('should select correct destination from an array of destinations', function() {
        expect(helper.getDestinations(
            ['app/common/css', 'app/bandc/css', 'app/browse/css'],
            'shop-UX/src/fear/app/common/sass/layout/pages/critical.css.map'
        )).to.equal('app/common/css');
    });

    it('should throw error if destination cannot be determined', function() {
        expect(function () {
            helper.getDestinations(
                ['app/common/css', 'app/bandc/css', 'app/browse/css'],
                'shop-UX/src/fear/app/xyz/sass/layout/pages/critical.css.map'
            );
        }).to.throw('Cannot determine destination for file.');
    });

    it('should return same if destination if destination string is supplied', function() {
        expect(helper.getDestinations(
            'app/browse/css',
            'shop-UX/src/fear/app/common/sass/layout/pages/critical.css.map'
        )).to.equal('app/browse/css');
    });

    describe('getDestinationIdentifier method', function () {
        it('should return team destination', function () {
            expect(helper.getDestinationIdentifier('app/common/css', 'shop-UX/src/fear/app/common/sass/layout/pages/critical.css.map')).to.equal('common');
        });
    });
});
