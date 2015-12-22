'use strict';

/**
 * @module tasks/test/sitespeed-io
 */

/**
 * taskFactory
 * @param config {Object}
 * @returns {Function}
 * task
 */
module.exports = function (config) {
    config = config || {};

    return function task(done) {
        var sitespeedio = require('gulp-sitespeedio'),
            options = {
                url: (config.url || 'http://localhost:8000/') + config.page,
                deep: 0,
                budget: require(config.budget).budget,
                skipTest: config.skipTest || 'cssnumreq,cssimagesnumreq,jsnumreq,yemptysrc,ycompress,ycsstop,yjsbottom,yexpressions,ydns,yminify,redirects,noduplicates,yetags,yxhr,yxhrmethod,mindom,yno404,ymincookie,ycookiefree,ynofilter,yfavicon,thirdpartyasyncjs,cssprint,cssinheaddomain,avoidfont,totalrequests,expiresmod,longexpirehead,nodnslookupswhenfewrequests,inlinecsswhenfewrequest,textcontent,thirdpartyversions,ycdn,connectionclose,privateheaders'
            };

        return sitespeedio(options)(done);
    };
};
