define([ "jquery", "underscore", "backbone", "text!./list.html", "models/bbmodel"],
		function($, _, Backbone, articleTemplate, BBModel) {
			"use strict";

			var ArticlesView = Backbone.View.extend({

				el : "#childContent",
				template : _.template(articleTemplate),
				events : {},
				initialize : function() {
					this.render();
				},
				render : function() {
					this.$el.html(this.template(this.model));
					app.i18n(this);
					return this;
				}

			});

			return ArticlesView;
		});