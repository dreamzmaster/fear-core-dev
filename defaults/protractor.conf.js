/*eslint-disable*/

var config = require(process.cwd() + '/config/config');
var browserUtils = require('../tasks/helpers/browser');

exports.config = {
    useMocks         : true,
    seleniumServerJar: '../../gulp-protractor/node_modules/protractor/selenium/selenium-server-standalone-2.47.1.jar',
    framework        : 'mocha',
    mochaOpts        : {
        timeout : 10000000,
        reporter: 'spec'
    },
    multiCapabilities: [
        {
            browserName : 'chrome',
            shardTestFiles: false,
            maxInstances  : 20
        }
    ],
    onPrepare: function () {

        setupAssertionFrameWork();
        setupProtractorGlobalUtils();
        //createWorld();

        if (browser.params.channel === 'default') {
            var browserWidth = config.get('breakpoint')[browser.params.breakpoint].width,
                browserHeight = 2000;

            browserUtils.setBrowserSize(browserWidth, browserHeight);
        }
    }
};

function setupAssertionFrameWork() {

    var chai           = require('chai');
    var chaiAsPromised = require('chai-as-promised');
    chai.use(chaiAsPromised);
    global.expect      = chai.expect;
}

function createWorld() {

    var world         = require('../../test/cucumber/step_definitions/ui/support/world.js');
    world             = new world;
    global.world      = new world.World(function () {});
}

function setupProtractorGlobalUtils() {
    global.EC = protractor.ExpectedConditions;
}
