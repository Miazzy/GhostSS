var _             = require('lodash'),
    api           = require('../api'),
    errors        = require('../errors'),
    updateCheck   = require('../update-check'),
    config        = require('../config'),
    adminControllers;

adminControllers = {
    // Route: index
    // Path: /ghost/
    // Method: GET
    index: function (req, res) {
        /*jslint unparam:true*/

        function renderIndex() {
            return api.configuration.browse().then(function (data) {
                var apiConfig = _.omit(data.configuration, function (value) {
                    return _.contains(['environment', 'database', 'mail', 'version'], value.key);
                });

                res.render('default', {
                    skip_google_fonts: config.isPrivacyDisabled('useGoogleFonts'),
                    configuration: apiConfig
                });
            });
        }

        renderIndex();
    }
};

module.exports = adminControllers;
