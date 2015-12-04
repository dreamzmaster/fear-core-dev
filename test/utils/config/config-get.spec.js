'use strict';

var expect = require('chai').expect;

var Config = require('../../../utils/config/config');
var mocks = require('./config-mocks');

var data = {
    default: {
        'webserver': { 'url' : 'http://localhost', 'port' : '3000' },
        'wdio': { 'output': '.tmp' },
        'karma': { 'root' : 'default', 'runOnce': true },
        'lint': { 'reporter' : 'simple' }
    },
    development: {
        'wdio': { 'output': '.dev' },
        'karma': { 'root' : 'dev' },
        'lint': { 'strict' : true },
        'paths': {
            'app' : { base : 'app' },
            'temp' : { base: '.tmp' },
            'team1' : { css : 'app/temp/css' },
            'team2' : {
                images: '{{folder}}/common/assets/images',
                font: '{{folder}}/common/assets/fonts',
                css: '{{folder}}/common/css',
                sass: '{{folder}}/common/sass',
                scripts: '{{folder}}/common/scripts',
                views: '{{folder}}/common/views'
            }
        },
        'development': {
            'karma': { 'root' : 'app' }
        }
    },
    integrated: {
        'wdio': { 'output': '.int' }
    }
};

function setEnvionment(env) {
    if(env) {
        process.env.NODE_ENV = env;
    } else {
        delete process.env.NODE_ENV;
    }
}

describe('config object', function(){
    describe('get', function(){
        var config, mockLoader, mockCli;
        var env = { integrated: 'integrated', development: 'development', production: 'production' };

        function configFactory() {
            mockCli = mocks.cliFactory();
            mockLoader = mocks.loaderFactory(data);
            return new Config(mockLoader, mockCli);
        }

        beforeEach(function() {
            setEnvionment();
            config = configFactory();
        });

        it('should be defined', function() {
            expect(config.get).to.not.be.undefined;
        });

        it('should return the configuration object for the given key', function() {
            var webserver = config.get('webserver');
            expect(webserver).to.deep.equal(data.default.webserver);
        });

        it('should merge in config keys', function () {
            var lint = config.get('lint');
            expect(lint).to.deep.equal({
                'reporter' : 'simple',
                'strict' : true
            });
        });

        it('should correctly override the result for the given environment', function() {
            var result;

            //Result for environment: development
            result = config.get('wdio');
            expect(result).to.deep.equal(data.development.wdio);

            setEnvionment(env.integrated);
            config = configFactory();
            result = config.get('wdio');
            expect(result).to.deep.equal(data.integrated.wdio);
        });

        it('should should override the keys in the development file', function() {
            var karma = config.get('karma');
            expect(karma).to.deep.equal({
                'root' : 'app',
                'runOnce': true
            });
        });

        it('should return the full config object when no items are provided', function() {
            var store = config.get();
            expect(store).to.equal(config._configStore);
        });

        it('should be possible to provide a path of keys', function() {
            var team1 = config.get('paths.team1'),
                css = config.get('paths.team1.css');
            expect(team1).to.deep.equal(data.development.paths.team1);
            expect(css).to.equal(data.development.paths.team1.css);
        });

        it('should correctly template a requested key given a context object', function() {
            var css = config.get('paths.team2.css', { folder: '.tmp' });
            expect(css).to.equal('.tmp/common/css');
        });

        it('should correclty template a requested key given a template string', function() {
            var font = config.get('paths.team2.font', 'temp.base');
            var sass = config.get('paths.team2.sass', 'app.base');
            var views = config.get('paths.team2.views', 'app.base');

            expect(font).to.equal('.tmp/common/assets/fonts');
            expect(sass).to.equal('app/common/sass');
            expect(views).to.equal('app/common/views');
        });

        it('should correctly template all the keys in a config object given a certain context', function(){
            var team2 = config.get('paths.team2', { folder: '.tmp'});
            expect(team2).to.deep.equal({
                images: '.tmp/common/assets/images',
                font: '.tmp/common/assets/fonts',
                css: '.tmp/common/css',
                sass: '.tmp/common/sass',
                scripts: '.tmp/common/scripts',
                views: '.tmp/common/views'
            });
        });

        it('should correclty template all keys in a config object given a template string', function() {
            var team2 = config.get('paths.team2', 'app.base');
            expect(team2).to.deep.equal({
                images: 'app/common/assets/images',
                font: 'app/common/assets/fonts',
                css: 'app/common/css',
                sass: 'app/common/sass',
                scripts: 'app/common/scripts',
                views: 'app/common/views'
            });
        });

    });
});
