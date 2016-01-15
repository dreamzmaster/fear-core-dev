/*global protractor, browser, window, document, angular, module*/

'use strict';

var browserHelper;

/**
 * @module tasks/helpers/browser
 */
browserHelper = module.exports = {

    /**
     * @type {Number}
     */
    browserOffsetWidth : 0,

    /**
     * @returns {Object} promise
     */
    setBrowserWidthOffset : function () {

        var deferred = protractor.promise.defer();

        browser.driver.manage().window().setSize(480, 320)
            .then(function () {
                return browser.executeScript(
                    function () {
                        var e = window,
                            a = 'inner';
                        if (!( 'innerWidth' in window )) {
                            a = 'client';
                            e = document.documentElement || document.body;
                        }
                        return {width: e[a + 'Width'], height: e[a + 'Height']};
                    }
                ).then(function (dims) {
                        browserHelper.browserOffsetWidth  = 480 - dims.width;

                        deferred.fulfill();
                    });
            });

        return deferred.promise;
    },

    /**
     * @param width {Number} pixels
     * @param height {Number} pixels
     */
    setBrowserSize : function (width, height) {

        var gutil = require('gulp-util');

        gutil.log(gutil.colors.green('Sizing browser to width', width + 'px'));

        browserHelper.setBrowserWidthOffset().then(function () {

            browser.driver.manage().window().setSize(
                width + browserHelper.browserOffsetWidth,
                height
            ).then(function () {

                    // Disable animations so e2e tests run more quickly
                    browser.addMockModule('disableNgAnimate', disableNgAnimate);

                    function disableNgAnimate() {
                        angular.module('disableNgAnimate', []).run(['$animate', function ($animate) {
                            $animate.enabled(false);
                        }]);
                    }
                });
        });
    }
};
