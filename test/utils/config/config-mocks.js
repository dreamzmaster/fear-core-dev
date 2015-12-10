'use strict';

var loader = require('../../../utils/config/loader');

function mockCliFactory() {
    return {
        argv : {}
    };
}

function mockLoaderFactory(config) {
    var mock = { 'config' : config || {} };
    return {
        resolvePath: loader.resolvePath,
        requireCwd: function () {
            var args = [].slice.call(arguments);
            var value = mock;
            args.every(function(key) {
                value = value[key];
                return value ? true : false;
            });
            return value;
        }
    };
}

module.exports = {
    cliFactory: mockCliFactory,
    loaderFactory: mockLoaderFactory
};
