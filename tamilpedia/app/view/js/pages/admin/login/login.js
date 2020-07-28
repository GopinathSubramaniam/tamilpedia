define([
    'jquery',
    'underscore',
    'backbone',
    'text!./login.html',
], function ($, _, Backbone, loginTemplate) {
    'use strict';

    var LoginView = Backbone.View.extend({

        template: _.template(loginTemplate),
        events: {
            'submit #loginForm': 'login'
        },
        initialize: function () {
            this.render();
        },
        render: function () {
            this.$el.html(this.template());
            return this;
        },
        login: function (ev) {
            ev.preventDefault();
            console.log('Login');
            console.log('ROuter = ', router);
            router.navigate('/admin/articles', true);
        }

    });
    return LoginView;
});