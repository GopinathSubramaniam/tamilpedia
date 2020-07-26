define([
	'jquery',
	'underscore',
	'backbone',
	'text!./sidebar.html',
    ], function($, _, Backbone, sidebarTemplate){
	'use strict';
	
	var FooterView = Backbone.View.extend({
		
		el: '#sideBar',
		template: _.template(sidebarTemplate),
		events: {},
		initialize: function () {
			 this.render();
		},
		render: function(){
			this.$el.html(this.template());
			this.$el.i18n();
			return this;
		}
		
	});
	return FooterView;
});