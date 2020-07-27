define([ 'jquery', 'underscore', 'backbone', 'text!./home.html', ''],
		function($, _, Backbone, dashboardTemplate) {
			'use strict';
			var DashboardView = Backbone.View.extend({

				el : '#childContent',
				template : _.template(dashboardTemplate),
				initialize : function() {
					this.render();
				},

				render : function() {
					this.$el.html(this.template());
					app.executeJqueryDep();
					return this;
				},

				events : {},
			});
			return DashboardView;
		});