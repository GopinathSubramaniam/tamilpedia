define([ 'jquery', 'underscore', 'backbone'],
		function($, _, Backbone) {
			'use strict';
			
			var CategoryListView = Backbone.View.extend({
				el : '#categoryList',
				template : _.template('<div id="categoryTree" class="pt-1"></div>'),
				initialize : function(options) {
					this.cats = options.tree;
					this.render();
				},
				render: function() {
					this.$el.html(this.template());
					this.init();
					return this;
				},
				init: function(){
					$('#categoryTree').tree({
	                    uiLibrary: 'bootstrap4',
	                    hasChildrenField: 'hasChild',
	                    childrenField: 'childs',
	                    dataSource: this.cats,
	                    textField: 'name',
	                    primaryKey: 'id',
	                    icons: { expand: '<i class="fas fa-plus-circle"></i>', collapse: '<i class="fas fa-minus"></i>' }
	                });
				}
			});
			return CategoryListView;
		});