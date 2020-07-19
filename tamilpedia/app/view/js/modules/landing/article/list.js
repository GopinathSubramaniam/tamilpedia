define([ "jquery", "underscore", "backbone", "text!./templates/list.html", "text!./templates/article-preview-modal.html", "models/bbmodel"],
		function($, _, Backbone, articleTemplate, articlePreviewModal, BBModel) {
			"use strict";

			var ArticlesView = Backbone.View.extend({

				el : "#childContent",
				template : _.template(articleTemplate+articlePreviewModal),
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