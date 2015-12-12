'use strict';

/**
 * jsPackageHelper
 * @type {{selectedPackages: Array, initialise: Function, setPackages: Function, filterPackages: Function, filterProduct: Function, selectChannelFromProduct: Function, get: Function, concatenate: Function}}
 */
var jsPackageHelper = {

    /**
     * selectedPackages
     */
    selectedPackages: [],

    /**
     * initialise
     * @param packagesConfig
     */
    initialise : function (packagesConfig) {
        this.setPackages(packagesConfig);
    },

    /**
     * setPackages
     * @param packages
     */
    setPackages: function (packages) {
        this.packages = packages;
    },

    /**
     * filterPackages
     * @param product
     * @param channel
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
     * @param product
     */
    filterProduct: function (product) {
        delete this.packages[product];
    },

    /**
     * selectChannelFromProduct
     * @param product
     * @param channel
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
     * @param product
     * @param channel
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
     */
    concatenate: function (packages) {
        this.selectedPackages = this.selectedPackages.concat(packages);
    }
};

module.exports = jsPackageHelper;
