'use strict';

var Config  = require('./config');
var loader  = require('./loader');
var cli     = require('./cli');

module.exports = function () {
    return new Config(loader, cli);
};
