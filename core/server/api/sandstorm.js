// # Sandstorm API
// RESTful API for the Sandstorm resource
var when            = require('when'),
    _               = require('lodash'),
    errors          = require('../errors'),
    utils           = require('./utils'),
    capnp          = require('capnp'),
    sandstorm;

var HackSession = capnp.importSystem("hack-session.capnp");

var publicIdPromise;

initPromise = function () {
    if (!publicIdPromise) {
        var connection = capnp.connect("unix:/tmp/sandstorm-api");
        var session = connection.restore("HackSessionContext", HackSession.HackSessionContext);
        publicIdPromise = session.getPublicId();
    }
};

sandstorm = {

    /**
     * ## live
     * Return link to live site
     * @param {{context}} options (optional)
     * @returns hash containing url
     */
    live: function browse(options) {
        initPromise();
        return publicIdPromise.then(function (data) {
            return {url: data.autoUrl};
        });
    },

    /**
     * ## faq
     * Return data for faq page
     * @param {{context}} options (optional)
     * @returns hash of relevant data
     */
    faq: function browse(options) {
        initPromise();
        return publicIdPromise;
    },
}

module.exports = sandstorm;
