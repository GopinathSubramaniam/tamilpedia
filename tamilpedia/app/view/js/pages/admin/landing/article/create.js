define([ 'jquery', 'underscore', 'backbone', 'text!./templates/create.html', '../../../models/bbmodel'],
		function($, _, Backbone, addTemplate, BBModel) {
			'use strict';

			var CreateArticlesView = Backbone.View.extend({

				el : '#childContent',
				template : _.template(addTemplate),
				events : {
					'submit #createArticleForm': 'createArticle',
					'click .previewBtn': 'preview'
				},
				initialize : function() {
					this.model = new Backbone.Model();
					this.listenTo(this.model, 'change', this.render);
					var self = this;
					app.getCategories().done(function(res){
						self.model.set('categories', res.data.cats);
						self.render();
					});
				},
				render : function() {
					this.$el.html(this.template(this.model.attributes));
					app.i18n(this);
					app.summerNote('#articleContent');
					$('[name=category]').select2();
					return this;
				},
				createArticle: function(ev){
					ev.preventDefault();
					var obj = app.getFormObj(ev.target);
					console.log('Obj = ', obj);
				},
				preview: function(ev){
					ev.preventDefault();
					console.log('preview');
				}

			});

			return CreateArticlesView;
		});