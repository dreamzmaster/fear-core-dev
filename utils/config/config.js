'use strict';

var extend = require('lodash/object/extend');
var merge = require('lodash/object/merge');
var template = require('lodash/string/template');

function Config(loader, cli) {
    this.loader = loader;
    this.cli = cli;

    this.options =  {
        root: 'config',
        delimeters: /{{([\s\S]+?)}}/g
    };

    this._env = cli.argv.env || process.env.NODE_ENV || 'development';

    this._defaults = this.loader.requireCwd(this.options.root, 'default');

    if(!this._defaults) {
        throw new Error('Default config file is not present! Add config/default.js');
    }

    this._overrides = this.loader.requireCwd(this.options.root, this.env(), 'development') || {};
    this._envConfig = {};

    this._configStore = merge({}, this._defaults);
}

extend(Config.prototype, {

    get: function (prop, context) {
        var result = this._configStore,
            rootKey = '',
            self = this;

        prop && prop.split('.').every(function(key, index, props) {
            !rootKey && (rootKey = key);

            if(index === 0 && !self._envConfig[key]) {
                var config = self.loader.requireCwd('config', self.env(), key);
                result = self._configStore[key] = merge(
                    (self._configStore[key] || {}),
                    (self._envConfig[key] = config),
                    self._overrides[key]
                );
            }else {
                result = result[key];
            }

            //Stop loop when there are no more keys or next result returns undefined
            return (typeof result === 'object') || !!props[index +1] || result[props[index + 1]];
        });

        if(context) {
            if(typeof result === 'string') {
                result = self._template(result, context, this._configStore[rootKey]);
            } else {
                var temp = {};
                Object.keys(result).forEach(function(key) {
                    temp[key] = self._template(result[key], context, self._configStore[rootKey]);
                });
                result = temp;
            }
        }
        return result;
    },

    _template: function(string, context, fallback) {
        var compiled;
        if(typeof context === 'string') {
            string = string.replace(this.options.delimeters, '{{' + context  + '}}');
            context = fallback;
        }

        compiled = template(string, { interpolate: this.options.delimeters });
        return compiled(context);
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

});

module.exports = Config;
