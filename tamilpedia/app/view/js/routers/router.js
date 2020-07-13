define([ 'jquery', "underscore", 'backbone', 'utils/constant', 'modules/header/header-view',
		'modules/footer/footer-view', 'modules/landing/dashboard/dashboard-view', 'modules/login/login-view',
		'modules/register/register-view', 'modules/landing/landing-view', 'modules/landing/category/category',
		'modules/landing/article/list',  'modules/landing/article/create'], 
		function($, _, Backbone, Constant, HeaderView, FooterView, DashboardView, LoginView, RegisterView,
		LandingView, CategoriesView, ArticleListView, CreateArticlesView) {
	'use strict';

	var footerElem = $("#footerContent");
	var mainElem = $("#mainContent");
	var freeRoutes = [ "login", "register" ];

	var Router = Backbone.Router.extend({

		routes : {
			'' : 'dashboardPage',
			'login' : 'loginPage',
			'register' : 'registerPage',
			'articles' : 'articlesPage',
			'articles/create' : 'createArticles',
			'categories' : 'categoriesPage',
		},
		before : function(route, params) {
			if (freeRoutes.indexOf(route) == -1) {
				if (!this.landingView) this.landingView = new LandingView();
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
			this.landingView = new LandingView();
		},

		loginPage : function() {
			console.log("Login");
			this.loginView = new LoginView({el : mainElem});
		},
		registerPage : function() {
			console.log("Register");
			this.registerView = new RegisterView({el : mainElem});
		},
		dashboardPage : function() {
			console.log("Dashboard");
			this.dashboardView = new DashboardView();
		},
		categoriesPage : function() {
			console.log("Categories");
			this.categoriesView = new CategoriesView();
		},
		articlesPage : function() {
			console.log("articlesPage");
			this.articleListView = new ArticleListView();
		},
		createArticles: function(){
			this.createArticlesView = new CreateArticlesView();
		}
	});
	var router = new Router();
	Backbone.history.start();
//    Backbone.history.start({ pushState: true });
	return router;
});