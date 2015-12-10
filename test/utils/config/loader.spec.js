'use strict';

var expect = require('chai').expect;
var loader = require('../../../utils/config/loader');

describe('config object', function() {

    describe('file loader', function(){

        it('should expose an api', function() {
            expect(loader.require).to.exist;
        });

    });

});
