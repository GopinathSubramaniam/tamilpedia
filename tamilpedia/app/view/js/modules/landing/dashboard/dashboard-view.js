define([ 'jquery', 'underscore', 'backbone', 'text!./dashboard.html', ],
		function($, _, Backbone, dashboardTemplate) {
			'use strict';
			var app = null;
			var DashboardView = Backbone.View.extend({

				el : '#childContent',
				template : _.template(dashboardTemplate),
				initialize : function() {
					this.render();
				},

				render : function() {
					this.$el.html(this.template());
					return this;
				},

				events : {},
			});
			return DashboardView;
		});