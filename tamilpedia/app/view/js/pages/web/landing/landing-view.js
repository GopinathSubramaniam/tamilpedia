define([
	'jquery',
	'underscore',
	'backbone',
	'text!./landing.html',
	'../header/header-view',
	'../footer/footer-view',
    ], function($, _, Backbone, landingTemplate, HeaderView, FooterView){
	'use strict';
	
	var LandingView = Backbone.View.extend({
		
		el: '#mainContent',
		template: _.template(landingTemplate),
		events: {},
		initialize: function () {
			 this.render();
		},
		render: function(){
			console.log("Landing Page");
			this.$el.html(this.template());
			new HeaderView();
			new FooterView();
			return this;
		},

		bindJQueryFunctions: () => {

		}
		
	});
	return LandingView;
});