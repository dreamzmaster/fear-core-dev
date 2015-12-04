'use strict';

var expect = require('chai').expect;

var Config = require('../../../utils/config/config');
var mocks = require('./config-mocks');

function resetEnvironment() {
    delete process.env.NODE_ENV;
}

describe('config object', function() {
    var config, config2, mockLoader, mockCli, argv;
    var env = { integrated: 'integrated', development: 'development', production: 'production' };
    var data= { default: { } };

    beforeEach(function() {
        resetEnvironment();
        mockCli = mocks.cliFactory();
        mockLoader = mocks.loaderFactory(data);
        argv = mockCli.argv;
        config = new Config(mockLoader, mockCli);
    });

    it('should be composable', function() {
        expect(config).to.be.an.instanceOf(Config),
        expect(config).to.exist;
    });

    it('should expose an api', function() {
        expect(config.get).to.exist;
        expect(config.path).to.exist;
        expect(config.env).to.exist;
        expect(config.getAppConfigTpl).to.exist;
    });

    it('should throw an error when the default config file isn\'t present', function() {
        function configFactory() {
            return new Config(mocks.loaderFactory(), mockCli);
        }

        expect(configFactory).to.throw('Default config file is not present!');
    });

    it('should default fall back to development environment', function() {
        expect(config.env()).to.equal(env.development);
    });

    it('should be possible to change the environment via arguments and environment variable', function() {
        process.env.NODE_ENV = env.development;
        config2 = new Config(mockLoader, mockCli);
        expect(config2.env()).to.equal(env.development);

        process.env.NODE_ENV = env.integrated;
        config2 = new Config(mockLoader, mockCli);
        expect(config2.env()).to.equal(env.integrated);

        argv.env = env.development;
        config2 = new Config(mockLoader, mockCli);
        expect(config2.env()).to.equal(env.development);

        argv.env = env.integrated;
        config2 = new Config(mockLoader, mockCli);
        expect(config2.env()).to.equal(env.integrated);
    });

    it('should use commandline arguments before environment variables', function() {
        argv.env = env.production;
        process.env.NODE_ENV = env.integrated;
        config2 = new Config(mockLoader, mockCli);
        expect(config2.env()).to.equal(env.production);
    });

    it('should resolve the config path for a specific type', function() {
        expect(config.path('webserver')).to.equal('config/development/webserver.js');
        expect(config.path('karma')).to.equal('config/development/karma.js');

        process.env.NODE_ENV = env.integrated;
        config2 = new Config(mockLoader, mockCli);

        expect(config2.path('webserver')).to.equal('config/integrated/webserver.js');
        expect(config2.path('karma')).to.equal('config/integrated/karma.js');
    });

});
