define([ "jquery", "underscore", "backbone", "summerNote", "models/bbmodel"],
		function($, _, Backbone, summernote, BBModel) {
	"use strict";
	
	var Constant = Backbone.View.extend({
	
		validate: function(val) {
			var b = false;
			if (val !== undefined && val !== '' && val !== null
					&& val !== 'undefined' && val !== 'null')
				b = true;
			return b;
		},
		
		getAuthorizationToken: function() {
			var uname = sessionStorage.getItem('uname');
			var pass = sessionStorage.getItem('pass');
			return 'Basic ' + btoa(uname + ':' + pass);
		},
		
		getFormObj : function(id) {
			var paramObj = {};
			$.each($(id).serializeArray(), function(_, kv) {
				paramObj[kv.name] = kv.value;
			});
			return paramObj;
		},
		
		i18n : function(view) {
			$(view.$el).i18n();
		},
		
		forceEvents : function(view) {
			$(view.el).undelegate();
			view.delegateEvents();
		},
		
		summerNote: function(identifier, height = 300, tabsize = 2) {
			return $(identifier).summernote({
				height : height,
				tabsize : tabsize
			});
		},
		
		getCategories: function(){
			var api = new BBModel({url: this.url.get_category});
			return api.fetch();
		},
		layout: {
		    child: "#childContent"
		},
		
		url: {
				"get_category": "/api/category/all",
				"post_category": "/api/category/create"
		},
		
	});
	
	return Constant;
});