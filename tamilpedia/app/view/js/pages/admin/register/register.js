define([
	'jquery',
	'underscore',
	'backbone',
	'text!./register.html',
    ], function($, _, Backbone, registerTemplate){
	'use strict';
	
	var RegisterView = Backbone.View.extend({
		
		el: '#mainContent',
		template: _.template(registerTemplate),
		events: {},
		initialize: function () {
			 this.render();
		},
		render: function(){
			this.$el.html(this.template());
			return this;
		}
		
	});
	return RegisterView;
});