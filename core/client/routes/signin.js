import styleBody from 'ghost/mixins/style-body';
import loadingIndicator from 'ghost/mixins/loading-indicator';

var SigninRoute = Ember.Route.extend(styleBody, loadingIndicator, {
    titleToken: 'Sign In',

    classNames: ['ghost-login'],

    beforeModel: function () {
        if (this.get('session').isAuthenticated) {
            this.transitionTo(SimpleAuth.Configuration.routeAfterAuthentication);
        } else {
            localStorage.setItem('ghost:session', '{"authenticator":"simple-auth-authenticator:oauth2-password-grant","access_token":"pYXDfXruoF9tiiC5EqFDRhjM3WxuNfJDjdorTMdOSu6Yjg9vxme4dTeYKRveeE56YADYizPB2JuIJiXueIZbpERQiX6vjk1EHL7BbIrWqQyByMoeCBp2LKZz3ywAVxoppw1r541rkvn6avfEFoJIqRDpplrYBO5VtgjPhaH4D4FoEMJ8FRydswm16Si35xRzqs7BdbXqTcKP1qAkXsqmqKgGHIff8O9L69Gbs9QQ7dgci8hRCu1Z9wVLI1IcuyH","refresh_token":"pelzMZ4QvTZC8EEeoVGPttRiOf2mEXVmjBGqa3lutnxakr2NvB7kM8U9qyrMZNG28jnOjmOYdPRdRiuc0cWwx9gmdLXHxDozIfnKTQXqWL5NQi0D6M0FnxpFWcV0ABogOHceUfDyB2CbhwnODwuHXt4kn3lkRIIY2VJ4BZwsDePajlhnuBkNAsEENNHPE1ByAUgNy4bwvjMsYINgj9ZYzW5LpRWAAPG0piwRYOSJsHgqUNBcCeBzHPsJH1xzizG","expires_in":3600000,"token_type":"Bearer","expires_at":9009910339513}');
            location.reload();
        }
    },

    model: function () {
        return Ember.Object.create({
            identification: '',
            password: ''
        });
    },

    // the deactivate hook is called after a route has been exited.
    deactivate: function () {
        this._super();

        var controller = this.controllerFor('signin');

        // clear the properties that hold the credentials when we're no longer on the signin screen
        controller.set('model.identification', '');
        controller.set('model.password', '');
    }
});

export default SigninRoute;
