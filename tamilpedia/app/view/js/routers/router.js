define([ 'jquery', "underscore", 'backbone', 'utils/constant', 'pages/web/header/header-view',
		'pages/web/footer/footer-view', 'pages/web/landing/home/home', 'pages/web/landing/landing-view',
		'pages/web/landing/category/category', 'pages/web/landing/article/list', 'pages/web/landing/article/create',
		'pages/web/landing/article/detail', 'pages/web/landing/profile/profile',
		'pages/admin/login/login', 'pages/admin/register/register'],
		function($, _, Backbone, Constant, HeaderView, FooterView, HomeView, WebLandingView, CategoriesView, ArticleListView,
		CreateArticlesView, ArticleDetail, ProfileView, AdminLoginView, AdminRegisterView) {
	'use strict';

	var footerElem = $("#footerContent");
	var freeRoutes = [ "login", "register" ];

	var Router = Backbone.Router.extend({

		routes : {
			'' : 'home',
			'articles' : 'articles',
			'articles/create' : 'createArticle',
			'articles/detail' : 'articleDetail',
			'admin': 'adminHome',
			'admin/login' : 'adminLogin',
			'admin/register' : 'adminRegister',
			'admin/profile' : 'adminProfile',
			'admin/categories' : 'adminCategories',

		},
		before : function(route, params) {
			if (freeRoutes.indexOf(route) == -1) {
				if (!this.landingView) this.landingView = new WebLandingView();
			}
			return false;
		},
		after : function(route, params) {
			if (freeRoutes.indexOf(route) > -1) {
				this.landingView = null;
			}
		},
		initialize : function() {
			app = new Constant();// Initializing the global variables and methods
			this.footerView = new FooterView({
				el : footerElem
			});
			this.landingView = new WebLandingView();
		},

		adminLogin : function() {
			console.log("Login");
			this.loginView = new AdminLoginView({el : $("#mainContent")});
		},
		adminRegister : function() {
			console.log("Register");
			this.registerView = new AdminRegisterView({el : $("#mainContent")});
		},
		adminCategories : function() {
			console.log("Categories");
			this.categoriesView = new CategoriesView();
		},
		adminProfile: function(){
		    var elem = $(app.layout.child);
		    this.profilePage = new ProfileView({el: elem});
		},
		home : function() {
			console.log("Dashboard");
			this.homeView = new HomeView();
		},
		articles : function() {
			console.log("articles");
			this.articleListView = new ArticleListView();
		},
		createArticles: function(){
			this.createArticlesView = new CreateArticlesView();
		},
		articleDetail: function(){
		    this.articleDetail = new ArticleDetail();
		},

	});
	var router = new Router();
	Backbone.history.start();
//    Backbone.history.start({ pushState: true });
	return router;
});