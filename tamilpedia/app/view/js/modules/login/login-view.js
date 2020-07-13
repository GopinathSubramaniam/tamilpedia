define([
	'jquery',
	'underscore',
	'backbone',
	'text!./login.html',
    ], function($, _, Backbone, loginTemplate){
	'use strict';
	
	var LoginView = Backbone.View.extend({
		
		template: _.template(loginTemplate),
		events: {},
		initialize: function () {
			 this.render();
		},
		render: function(){
			this.$el.html(this.template());
			return this;
		}
		
	});
	return LoginView;
});