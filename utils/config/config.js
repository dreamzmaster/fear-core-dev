'use strict';

var merge = require('lodash/object/merge');
var template = require('lodash/string/template');
var every = require('lodash/collection/every');
var each = require('lodash/collection/each');

var options = {
    root: 'config',
    delimeters: /{{([\s\S]+?)}}/g
};

function _template(string, context, fallback) {
    var compiled;
    if(typeof context === 'string') {
        string = string.replace(options.delimeters, '{{' + context  + '}}');
        context = fallback;
    }

    compiled = template(string, { interpolate: options.delimeters });
    return compiled(context);
}

function Config(loader, cli) {
    var development = 'development';

    this.loader = loader;

    this._env = cli.argv.env || process.env.NODE_ENV || development;

    this._defaults = this.loader.requireCwd(options.root, 'default');

    if(!this._defaults) {
        throw new Error('Default config file is not present! Add config/default.js');
    }

    this._overrides = this.loader.requireCwd(options.root, this.env(), 'development') || {};
    this._envConfig = {};

    this._configStore = merge({}, this._defaults);
}

Config.prototype = {

    get: function (prop, context) {
        var result = this._configStore,
            rootKey = '',
            config = this,
            temp, configMap;

        prop && every(prop.split('.'), function(key, index, props) {
            if(!rootKey) {
                rootKey = key;
            }

            if(index === 0 && !config._envConfig[key]) {
                configMap = config.loader.requireCwd('config', config.env(), key);
                result = config._configStore[key] = merge(
                    (config._configStore[key] || {}),
                    (config._envConfig[key] = configMap),
                    config._overrides[key]
                );
            }else {
                result = result[key];
            }

            //Stop loop when there are no more keys or next result returns undefined
            return (typeof result === 'object') || !!props[index +1] || result[props[index + 1]];
        });

        if(context) {
            if(typeof result === 'string') {
                result = _template(result, context, this._configStore[rootKey]);
            } else {
                temp = {};
                each(Object.keys(result),function(key) {
                    temp[key] = _template(result[key], context, config._configStore[rootKey]);
                });
                result = temp;
            }
        }
        return result;
    },

    path: function (type) {
        return this.loader.resolvePath('config', this.env(), type + '.js');
    },

    env: function () {
        return this._env;
    },

    getAppConfigTpl: function () {
        return '/*jshint quotmark:true */ \"use strict\"; define(function () { return __JSON_CONFIG__; });';
    }

};

module.exports = Config;
