// # Sandstorm API
// RESTful API for the Sandstorm resource
var capnp          = require('capnp'),
    url            = require('url'),
    sandstorm;

var HackSession = capnp.importSystem("hack-session.capnp");

var publicIdPromise;

var initPromise = function () {
    if (!publicIdPromise) {
        var connection = capnp.connect("unix:/tmp/sandstorm-api");
        var session = connection.restore("HackSessionContext", HackSession.HackSessionContext);
        publicIdPromise = session.getPublicId();
        publicIdPromise.tap = function () {
            return publicIdPromise;
        };
    }
};

sandstorm = {

    /**
     * ## live
     * Return link to live site
     * @param {{context}} options (optional)
     * @returns hash containing url
     */
    live: function browse() {
        initPromise();
        var promise = publicIdPromise.then(function (data) {
            return {url: data.autoUrl};
        });
        promise.tap = function () {
            return promise;
        };
        return promise;
    },

    /**
     * ## faq
     * Return data for faq page
     * @param {{context}} options (optional)
     * @returns hash of relevant data
     */
    faq: function browse() {
        initPromise();
        var promise = publicIdPromise.then(function (data) {
            data.autoUrl = url.parse(data.autoUrl).host;
            return data;
        });
        promise.tap = function () {
            return promise;
        };
        return promise;
    },
};

module.exports = sandstorm;
