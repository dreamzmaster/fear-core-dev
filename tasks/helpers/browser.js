/*global protractor, browser, window, document, angular*/

'use strict';

var gutil = require('gulp-util');

function Browser () {}

Browser.prototype = {

    /**
     * browserOffsetWidth
     * @type {Number}
     */
    browserOffsetWidth : 0,

    /**
     * setBrowserWidthOffset
     * @returns {*}
     */
    setBrowserWidthOffset : function () {

        var self = this,
            deferred = protractor.promise.defer();

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
                        self.browserOffsetWidth  = 480 - dims.width;

                        deferred.fulfill();
                    });
            });

        return deferred.promise;
    },

    /**
     * setBrowserSize
     * @param width {Number}
     * @param height {Number}
     */
    setBrowserSize : function (width, height) {

        gutil.log(gutil.colors.green('Sizing browser to width', width + 'px'));

        var self = this;

        self.setBrowserWidthOffset().then(function () {

            browser.driver.manage().window().setSize(
                width + self.browserOffsetWidth,
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

/**
 * @module tasks/helpers/browser
 */
module.exports = new Browser();
