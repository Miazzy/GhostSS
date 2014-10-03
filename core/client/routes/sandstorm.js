import styleBody from 'ghost/mixins/style-body';
import loadingIndicator from 'ghost/mixins/loading-indicator';
import ghostPaths from 'ghost/utils/ghost-paths';

var SandstormRoute = Ember.Route.extend(SimpleAuth.AuthenticatedRouteMixin, styleBody, loadingIndicator, {
    classNames: ['sandstorm'],

    model: function () {
        return Ember.$.getJSON(ghostPaths().apiRoot + '/sandstorm/faq');
    }
});

export default SandstormRoute;
