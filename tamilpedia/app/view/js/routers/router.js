define([ 'jquery', "underscore", 'backbone', 'utils/constant', 'modules/header/header-view',
		'modules/footer/footer-view', 'modules/landing/home/home', 'modules/login/login-view',
		'modules/register/register-view', 'modules/landing/landing-view', 'modules/landing/category/category',
		'modules/landing/article/list',  'modules/landing/article/create', 'modules/landing/article/detail',
		'modules/landing/profile/profile'],
		function($, _, Backbone, Constant, HeaderView, FooterView, HomeView, LoginView, RegisterView,
		LandingView, CategoriesView, ArticleListView, CreateArticlesView, ArticleDetail, ProfileView) {
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
			'articles/detail' : 'articleDetail',
			'categories' : 'categoriesPage',
			'profile' : 'profilePage',
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
			this.loginView = new LoginView({el : $("#mainContent")});
		},
		registerPage : function() {
			console.log("Register");
			this.registerView = new RegisterView({el : $("#mainContent")});
		},
		dashboardPage : function() {
			console.log("Dashboard");
			this.homeView = new HomeView();
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
		},
		articleDetail: function(){
		    this.articleDetail = new ArticleDetail();
		},
		profilePage: function(){
		    var elem = $(app.layout.child);
		    this.profilePage = new ProfileView({el: elem});
		}
	});
	var router = new Router();
	Backbone.history.start();
//    Backbone.history.start({ pushState: true });
	return router;
});