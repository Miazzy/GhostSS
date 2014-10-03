var _             = require('lodash'),
    when          = require('when'),
    api           = require('../api'),
    errors        = require('../errors'),
    updateCheck   = require('../update-check'),
    adminControllers;

adminControllers = {
    // Route: index
    // Path: /ghost/
    // Method: GET
    'index': function (req, res) {
        console.log('admin');
        /*jslint unparam:true*/

        function renderIndex() {
            res.render('default');
        }

        renderIndex();
    }
};

module.exports = adminControllers;
