define([
	'jquery',
	'underscore',
	'backbone',
	'text!./templates/profile.html',
    ], function($, _, Backbone, profileTemplate){
	'use strict';
	
	var ProfileView = Backbone.View.extend({
		
		template: _.template(profileTemplate),
		events: {},
		initialize: function () {
			 this.render();
		},
		render: function(){
			this.$el.html(this.template());
			console.log(app.layout);
			app.i18n(this);
			return this;
		}
		
	});
	return ProfileView;
});