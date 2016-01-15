'use strict';

/**
 * @module tasks/helpers/js-packages
 */
var jsPackageHelper = {

    /**
     * selectedPackages
     * @type {Array}
     */
    selectedPackages: [],

    /**
     * initialise
     * @param packagesConfig {Object}
     * @returns {void}
     */
    initialise : function (packagesConfig) {
        this.setPackages(packagesConfig);
    },

    /**
     * setPackages
     * @param packages {Object}
     * @returns {void}
     */
    setPackages: function (packages) {
        this.packages = packages;
    },

    /**
     * filterPackages
     * @param product {String}
     * @param channel {String}
     * @returns {void}
     */
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

    /**
     * filterProduct
     * @param product {String}
     * @returns {void}
     */
    filterProduct: function (product) {
        delete this.packages[product];
    },

    /**
     * selectChannelFromProduct
     * @param product {String}
     * @param channel {String}
     * @returns {void}
     */
    selectChannelFromProduct: function (product, channel) {
        for (var c in this.packages[product]) {
            if (this.packages[product].hasOwnProperty(c)) {
                if (c === channel || channel === 'all') {
                    this.concatenate(this.packages[product][c].packages);
                }
            }
        }
    },

    /**
     * get
     * @param product {String}
     * @param channel {String}
     * @returns {Object}
     */
    get: function (product, channel) {

        this.concatenate(this.packages.common.packages);

        this.filterProduct('common');

        this.filterPackages(product, channel);

        return this.selectedPackages;
    },

    /**
     * concatenate
     * @param packages
     * @returns {void}
     */
    concatenate: function (packages) {
        this.selectedPackages = this.selectedPackages.concat(packages);
    }
};

module.exports = jsPackageHelper;
