define([
	'jquery',
	'underscore',
	'backbone',
	'text!./footer.html',
    ], function($, _, Backbone, footerTemplate){
	'use strict';
	
	var FooterView = Backbone.View.extend({
		el : '#footerContent',
		template: _.template(footerTemplate),
		events: {},
		initialize: function () {
			 this.render();
		},
		render: function(){
			this.$el.html(this.template());
			return this;
		}
		
	});
	return FooterView;
});