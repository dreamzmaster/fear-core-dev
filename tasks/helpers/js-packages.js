'use strict';

var jsPackageHelper;

/**
 * @module tasks/helpers/js-packages
 */
jsPackageHelper = module.exports = {

    /**
     * @type {Array}
     */
    selectedPackages: [],

    /**
     * @param packagesConfig {Object}
     */
    initialise : function (packagesConfig) {
        jsPackageHelper.setPackages(packagesConfig);
    },

    /**
     * @param packages {Object}
     */
    setPackages: function (packages) {
        jsPackageHelper.packages = packages;
    },

    /**
     * @param product {String}
     * @param channel {String}
     */
    filterPackages: function (product, channel) {
        for (var p in this.packages) {
            if (jsPackageHelper.packages.hasOwnProperty(p)) {
                if (p !== product && product !== 'all') {
                    jsPackageHelper.filterProduct(p);
                }

                jsPackageHelper.selectChannelFromProduct(p, channel);
            }
        }
    },

    /**
     * @param product {String}
     */
    filterProduct: function (product) {
        delete jsPackageHelper.packages[product];
    },

    /**
     * @param product {String}
     * @param channel {String}
     */
    selectChannelFromProduct: function (product, channel) {
        for (var c in jsPackageHelper.packages[product]) {
            if (jsPackageHelper.packages[product].hasOwnProperty(c)) {
                if (c === channel || channel === 'all') {
                    jsPackageHelper.concatenate(jsPackageHelper.packages[product][c].packages);
                }
            }
        }
    },

    /**
     * @param product {String}
     * @param channel {String}
     * @returns {Object}
     */
    get: function (product, channel) {

        jsPackageHelper.concatenate(jsPackageHelper.packages.common.packages);

        jsPackageHelper.filterProduct('common');

        jsPackageHelper.filterPackages(product, channel);

        return jsPackageHelper.selectedPackages;
    },

    /**
     * @param packages
     */
    concatenate: function (packages) {
        jsPackageHelper.selectedPackages = jsPackageHelper.selectedPackages.concat(packages);
    }
};
