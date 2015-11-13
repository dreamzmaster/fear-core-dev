'use strict';

var jsPackageHelper = {

    selectedPackages: [],

    initialise : function () {
        this.setPackages(global.config.get('packages'));
    },

    setPackages: function (packages) {
        this.packages = packages;
    },

    filterPackages: function (product, channel) {
        for (var p in this.packages) {
            if (this.packages.hasOwnProperty(p)) {
                if (p !== product && product !== 'all') {
                    this.filterProduct(p);
                }

                this.selectChannelFromProduct(p, channel);
            }
        }
    },

    filterProduct: function (product) {
        delete this.packages[product];
    },

    selectChannelFromProduct: function (product, channel) {
        for (var c in this.packages[product]) {
            if (this.packages[product].hasOwnProperty(c)) {
                if (c === channel || channel === 'all') {
                    this.concatenate(this.packages[product][c].packages);
                }
            }
        }
    },

    get: function (product, channel) {

        this.initialise();

        this.concatenate(this.packages.common.packages);

        this.filterProduct('common');

        this.filterPackages(product, channel);

        return this.selectedPackages;
    },

    concatenate: function (packages) {
        this.selectedPackages = this.selectedPackages.concat(packages);
    }
};

module.exports = jsPackageHelper;
