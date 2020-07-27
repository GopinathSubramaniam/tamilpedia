define(['jquery', 'underscore', 'backbone', 'utils/constant',
    'pages/web/landing/home/home',
    'pages/web/landing/landing-view',
    'pages/web/landing/category/category',
    'pages/web/landing/article/list',
    'pages/web/landing/article/create',
    'pages/web/landing/article/detail',
    'pages/web/landing/profile/profile',

    'pages/admin/login/login',
    'pages/admin/register/register',
    'pages/admin/landing/landing',
    'pages/admin/landing/article/list',
    'pages/admin/landing/article/detail'],
    function ($, _, Backbone, Constant,
        HomeView,
        WebLandingView,
        CategoriesView,
        ArticleList,
        CreateArticlesView,
        ArticleDetail,
        ProfileView,

        AdminLoginView,
        AdminRegisterView,
        AdminLandingView,
        AdminArticleList,
        AdminArticleDetail
    ) {

        'use strict';

        var freeRoutes = ['login', 'register'];
        var Router = Backbone.Router.extend({

            routes: {
                '': 'home',
                'articles': 'articles',
                'articles/create': 'createArticle',
                'articles/detail': 'articleDetail',
                'articles/list': 'articleList',
                'admin/articles': 'adminArticles',
                'admin/login': 'adminLogin',
                'admin/register': 'adminRegister',
                'admin/profile': 'adminProfile',
                'admin/categories': 'adminCategories',
                'admin/articles/detail/:id': 'adminArticlesDetail',

            },
            before: function (route, params) {
                if (!this.landingView) {
                    console.log('Route = ', route);
                    if (freeRoutes.indexOf(route) == -1 && route.indexOf('admin') > -1) {
                        this.landingView = new AdminLandingView();
                    } else {
                        this.landingView = new WebLandingView();
                    }
                }
                return false;
            },
            after: function (route, params) {
                if (freeRoutes.indexOf(route) > -1) {
                    this.landingView = null;
                }
            },
            initialize: function () {
                app = new Constant();// Initializing the global variables and methods
                //this.landingView = new WebLandingView();
            },
            // Admin functions
            adminLogin: function () {
                this.loginView = new AdminLoginView({ el: $('#mainContent') });
            },
            adminRegister: function () {
                this.registerView = new AdminRegisterView({ el: $('#mainContent') });
            },
            adminCategories: function () {
                this.categoriesView = new CategoriesView();
            },
            adminProfile: function () {
                var elem = $(app.layout.child);
                this.profilePage = new ProfileView({ el: elem });
            },
            adminArticles: function () {
                console.log('Admin Articles');
                this.adminArticleList = new AdminArticleList();
            },
            adminArticlesDetail: function () {
                console.log('Admin Articles Detail');
                this.adminArticleDetail = new AdminArticleDetail();
            },

            // User functions
            articles: function () {
                console.log('articles');
                this.articleList = new ArticleList();
            },
            createArticles: function () {
                this.createArticlesView = new CreateArticlesView();
            },
            articleDetail: function () {
                this.articleDetail = new ArticleDetail();
            },
            
        });
        var router = new Router();
        Backbone.history.start();
        //    Backbone.history.start({ pushState: true });
        return router;
    });