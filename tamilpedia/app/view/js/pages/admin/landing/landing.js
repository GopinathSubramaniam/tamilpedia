define([
	'jquery',
	'underscore',
	'backbone',
	'text!./landing.html',
	'../header/header-view',
	'../footer/footer-view',
], function ($, _, Backbone, landingTemplate, AdminHeaderView, AdminFooterView){
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
			new AdminHeaderView();
			new AdminFooterView();
			return this;
		},

		bindJQueryFunctions: () => {

		}
		
	});
	return LandingView;
});