'use strict';

var packageHelper = require('../../tasks/helpers/js-packages');
var expect = require('chai').expect;

describe('Javascript packages helper', function () {

    packageHelper.initialise = function () {
        packageHelper.setPackages(getMockData());
        packageHelper.selectedPackages = [];
    };

    it('should allow you set a packages config', function () {

        packageHelper.initialise();

        expect(packageHelper.packages).to.be.a('object');
    });

    it('should allow you to filter a product', function () {

        packageHelper.filterProduct('product1');

        expect(packageHelper.packages.product1).to.be.undefined;
        expect(packageHelper.packages.product2).to.be.a('object');
    });

    it('should allow you add an array of packages', function () {

        packageHelper.initialise();

        packageHelper.concatenate(packageHelper.packages.common.packages);

        expect(packageHelper.selectedPackages).to.deep.equal(['packages/common.package']);
    });

    it('should allow you to add specified channel packages from a specified product', function () {

        packageHelper.initialise();

        packageHelper.selectChannelFromProduct('product2', 'channel1');

        expect(packageHelper.selectedPackages).to.deep.equal([
            'packages/channel1/product2.package'
        ]);
    });

    it('should allow you to add all channel packages from a specified product', function () {

        packageHelper.initialise();

        packageHelper.selectChannelFromProduct('product2', 'all');

        expect(packageHelper.selectedPackages).to.deep.equal([
            'packages/channel1/product2.package',
            'packages/channel2/product2.package'
        ]);
    });

    it('should allow you to add specified channel packages from all products', function () {

        packageHelper.initialise();

        packageHelper.filterPackages('all', 'channel1');

        expect(packageHelper.selectedPackages).to.deep.equal([
            'packages/channel1/product1.package',
            'packages/channel1/product2.package'
        ]);
    });

    describe('get method', function () {

        it('should return all channel/product packages and common packages when requested', function () {

            packageHelper.initialise();

            packageHelper.get('all', 'all');

            expect(packageHelper.selectedPackages).to.deep.equal([
                'packages/common.package',
                'packages/channel1/product1.package',
                'packages/channel2/product1.package',
                'packages/channel1/product2.package',
                'packages/channel2/product2.package'
            ]);
        });
    });

    function getMockData() {
        return {
            'common': {
                'packages': [
                    'packages/common.package'
                ]
            },
            'product1': {
                'channel1': {
                    'packages': [
                        'packages/channel1/product1.package'
                    ]
                },
                'channel2': {
                    'packages': [
                        'packages/channel2/product1.package'
                    ]
                }
            },
            'product2': {
                'channel1': {
                    'packages': [
                        'packages/channel1/product2.package'
                    ]
                },
                'channel2': {
                    'packages': [
                        'packages/channel2/product2.package'
                    ]
                }
            }
        };
    }
});
