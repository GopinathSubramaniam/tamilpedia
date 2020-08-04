define(['jquery', 'underscore', 'backbone', 'text!./templates/create.html', '../../app-service'],
    function ($, _, Backbone, addTemplate, appService) {
        'use strict';

        var CreateArticlesView = Backbone.View.extend({

            el: '#childContent',
            template: _.template(addTemplate),
            events: {
                'submit #createArticleForm': 'createArticle',
                'click .previewBtn': 'preview'
            },
            initialize: function () {
                this.model = new Backbone.Model();
                var self = this;
                appService.getCategoryList().done(function (res) {
                    self.model.set('categories', res.data);
                    self.render();
                });
            },
            render: function () {
                this.$el.html(this.template());
                app.i18n(this);
                app.summerNote('#articleContent', 400);
                $('[name=category]').magicSuggest({
                    data: this.model.get('categories')
                });
                $('[name=tags]').magicSuggest({
                    data: [{ "id": "Paris", "name": "Paris" }, { "id": "New York", "name": "New York" }]
                });
                return this;
            },
            createArticle: function (ev) {
                ev.preventDefault();
                var obj = app.getFormObj(ev.target);
                console.log('Obj = ', obj);
            },
            preview: function (ev) {
                ev.preventDefault();
                console.log('preview');
            }

        });

        return CreateArticlesView;
    });