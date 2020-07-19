define([ "jquery", "underscore", "backbone", "text!./templates/detail.html", "models/bbmodel"],
		function($, _, Backbone, detailTemplate, BBModel) {
			"use strict";

			var ArticleDetail = Backbone.View.extend({
				el : "#childContent",
				template : _.template(detailTemplate),
				initialize : function() {
					this.render();
				},
				render : function() {
					this.$el.html(this.template(this.model));
					return this;
				}
			});
			return ArticleDetail;
		});