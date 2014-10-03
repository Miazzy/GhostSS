var admin       = require('../controllers/admin'),
    frontend    = require('../controllers/frontend'),
    config      = require('../config'),
    express     = require('express'),
    utils       = require('../utils'),
    api         = require('../api'),

    adminRoutes;

adminRoutes = function (middleware) {
    var router = express.Router(),
        subdir = config.paths.subdir;

    // ### Admin routes
    router.get(/^\/(logout|signout)\/$/, function redirect(req, res) {
        /*jslint unparam:true*/
        res.set({'Cache-Control': 'public, max-age=' + utils.ONE_YEAR_S});
        res.redirect(301, subdir + '/ghost/signout/');
    });
    router.get(/^\/signup\/$/, function redirect(req, res) {
        /*jslint unparam:true*/
        res.set({'Cache-Control': 'public, max-age=' + utils.ONE_YEAR_S});
        res.redirect(301, subdir + '/ghost/signup/');
    });

    // redirect to /ghost and let that do the authentication to prevent redirects to /ghost//admin etc.
    router.get(/^\/((ghost-admin|admin|wp-admin|dashboard|signin|login)\/?)$/, function (req, res) {
        /*jslint unparam:true*/
        res.redirect(subdir + '/ghost/');
    });

    router.get(/^\/live-sandstorm\/$/, function redirect(req, res) {
        /*jslint unparam:true*/
        return api.sandstorm.live().then(function (data) {
            res.redirect(301, data.url);
        });
    });

    router.get(/^\/ghost\//, middleware.redirectToSetup, admin.index);

    router.get('/', function(req, res, next) {
        if (req.headers['user-agent'] == 'sandstormpublish') {
            frontend.homepage(req,res,next);
        } else {
            res.redirect(subdir + '/ghost/');
        }
    });

    return router;
};

module.exports = adminRoutes;
