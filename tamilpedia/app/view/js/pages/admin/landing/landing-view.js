define([
	'jquery',
	'underscore',
	'backbone',
	'text!./landing.html',
	'../header/header-view',
    ], function($, _, Backbone, landingTemplate, HeaderView){
	'use strict';
	
	var LandingView = Backbone.View.extend({
		
		el: '#mainContent',
		template: _.template(landingTemplate),
		events: {},
		initialize: function () {
			 this.render();
		},
		render: function(){
			this.$el.html(this.template());
			new HeaderView();
			return this;
		},

		bindJQueryFunctions: () => {

		}
		
	});
	return LandingView;
});