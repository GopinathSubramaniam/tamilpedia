define(['jquery', 'underscore', 'backbone', 'utils/constant',
    'pages/web/landing/landing-view',
    'pages/web/landing/article/list',
    'pages/web/landing/article/detail',
    'pages/web/landing/profile/profile',

    'pages/admin/login/login',
    'pages/admin/register/register',
    'pages/admin/landing/landing',
    'pages/admin/landing/article/create',
    'pages/admin/landing/article/list',
    'pages/admin/landing/article/detail',
    'pages/admin/landing/category/list'],
    function ($, _, Backbone, Constant,
        WebLandingView,
        ArticleList,
        ArticleDetail,
        ProfileView,

        AdminLogin,
        AdminRegister,
        AdminLanding,
        AdminArticleCreate,
        AdminArticleList,
        AdminArticleDetail,
        AdminCategoryList
    ) {

        'use strict';

        var freeRoutes = ['admin/login', 'admin/register'];
        var currentRole = null;

        var Router = Backbone.Router.extend({

            routes: {
                '': 'articles',
                'articles': 'articles',
                'articles/create': 'createArticle',
                'articles/detail/:id': 'articleDetail',
                'articles/list': 'articleList',
                'admin/articles/create': 'adminArticlesCreate',
                'admin/articles': 'adminArticles',
                'admin/login': 'adminLogin',
                'admin/register': 'adminRegister',
                'admin/profile': 'adminProfile',
                'admin/categories': 'adminCategories',
                'admin/articles/detail/:id': 'adminArticlesDetail',

            },
            before: function (route, params) {
                var isAdmin = (route.indexOf(freeRoutes) == -1 && route.indexOf('admin') > -1);
                if (isAdmin) {
                    if (currentRole != app.text.role.admin) {
                        this.landingView = new AdminLanding();
                        currentRole = app.text.role.admin;
                    }
                } else {
                    if (currentRole != app.text.role.user) {
                        this.landingView = new WebLandingView();
                        currentRole = app.text.role.user;
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
                this.loginView = new AdminLogin({ el: $('#mainContent') });
            },
            adminRegister: function () {
                this.registerView = new AdminRegister({ el: $('#mainContent') });
            },
            adminCategories: function () {
                this.adminCategoryList = new AdminCategoryList();
            },
            adminProfile: function () {
                var elem = $(app.layout.child);
                this.profilePage = new ProfileView({ el: elem });
            },
            adminArticlesCreate: function() {
                this.adminArticleCreate = new AdminArticleCreate();
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
        router = new Router();
        Backbone.history.start();
        //    Backbone.history.start({ pushState: true });
        return router;
    });