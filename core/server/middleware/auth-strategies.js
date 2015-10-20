var models = require('../models'),
    passport = require('passport'),
    util = require('util'),
    strategies;

function TokenStrategy(verify) {
        console.log("token1");

  if (!verify) throw new Error('token authentication strategy requires a verify function');

  this._usernameHeader = 'x-sandstorm-username';
  this._tokenHeader    = 'x-sandstorm-user-id';

  passport.Strategy.call(this);
  this.name = 'token';
  this._verify = verify;
        console.log("token2");
}

/**
 * Inherit from `passport.Strategy`.
 */
util.inherits(TokenStrategy, passport.Strategy);

/**
 * Authenticate request based on the contents of a form submission.
 *
 * @param {Object} req
 * @api protected
 */
TokenStrategy.prototype.authenticate = function(req, options) {
        console.log("token3");
  var self = this;
  var username = req.headers[this._usernameHeader];
  var token    = req.headers[this._tokenHeader];

  if (!username || !token) {
    return this.fail(new Error('Missing credentials'));
  }

  function verified(err, user, info) {
    if (err) { return self.error(err); }
    if (!user) { return self.fail(info); }
    self.success(user, info);
  }
  this._verify(username, token, verified);
};

strategies = {

    /**
     * ClientPasswordStrategy
     *
     * This strategy is used to authenticate registered OAuth clients.  It is
     * employed to protect the `token` endpoint, which consumers use to obtain
     * access tokens.  The OAuth 2.0 specification suggests that clients use the
     * HTTP Basic scheme to authenticate (not implemented yet).
     * Use of the client password strategy is implemented to support ember-simple-auth.
     */
    clientPasswordStrategy: function clientPasswordStrategy(clientId, clientSecret, done) {
        return models.Client.findOne({slug: clientId})
            .then(function then(model) {
                if (model) {
                    var client = model.toJSON();
                    if (client.secret === clientSecret) {
                        return done(null, client);
                    }
                }
                return done(null, false);
            });
    },

    /**
     * BearerStrategy
     *
     * This strategy is used to authenticate users based on an access token (aka a
     * bearer token).  The user must have previously authorized a client
     * application, which is issued an access token to make requests on behalf of
     * the authorizing user.
     */
    bearerStrategy: function bearerStrategy(accessToken, done) {
        return models.Accesstoken.findOne({token: accessToken})
            .then(function then(model) {
                if (model) {
                    var token = model.toJSON();
                    if (token.expires > Date.now()) {
                        return models.User.findOne({id: token.user_id})
                            .then(function then(model) {
                                if (model) {
                                    var user = model.toJSON(),
                                        info = {scope: '*'};
                                    return done(null, {id: user.id}, info);
                                }
                                return done(null, false);
                            });
                    } else {
                        return done(null, false);
                    }
                } else {
                    return done(null, false);
                }
            });
    },
    TokenStrategy: TokenStrategy,
    tokenStrategy: function(username, token, done) {
        console.log("success");
        username = decodeURIComponent(username);
        token = decodeURIComponent(token);
        return models.Client.findOne({slug: token})
            .then(function then(model) {
                if (model) {
                    var client = model.toJSON();
                    return done(null, client);
                } else {
                    console.log("Create user");
                }
                return done(null, false);
            });
    },
};

module.exports = strategies;
