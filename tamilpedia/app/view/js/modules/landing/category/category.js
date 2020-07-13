define([ "jquery", "underscore", "backbone", "text!./category.html", "text!../../modals/category.html", "models/bbmodel", "./list" ], 
		function($, _, Backbone, categoryTemplate, createCategoryModal, BBModel, CategoryListView) {
	"use strict";
	
	var CategoriesView = Backbone.View.extend({
		el : "#childContent",
		template : _.template(categoryTemplate+createCategoryModal),
		initialize : function() {
			this.model = new BBModel();
			this.init();
			this.listenTo(this.model, "change", this.render);
		},
		render : function() {
			app.forceEvents(this);
			$("#childContent").html(this.template(this.model.attributes.data));
			this.renderCategoryList();
			app.i18n(this);
			return this;
		},
		events: {
			"submit #addCategoryForm": "createCategory"
		},
		
		init: function() {
			var self = this;
			app.getCategories().done(function(bookResponse){
				self.model.set("data", bookResponse.data);
			});
		},
		createCategory: function(ev){
			ev.preventDefault();
			var obj = app.getFormObj(ev.target);
			console.log("addCategory = ", obj);
			var categoryObj = new BBModel({url: app.url.post_category});
			$("#addCategoryModal").modal("hide");
			$(".modal-backdrop").remove();
			categoryObj.save(obj).done(() => {
				this.init();
			});
		},
		
		renderCategoryList: function(){
			new CategoryListView({el: "#categoryList", tree: this.model.attributes.data.tree});
		},
		
	});
	return CategoriesView;
});