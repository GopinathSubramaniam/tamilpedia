define(["jquery", "underscore", "backbone", "text!./templates/list.html", "text!./templates/article-preview-modal.html", "../../../models/bbmodel"],
    function ($, _, Backbone, articleTemplate, articlePreviewModal, BBModel) {
        "use strict";

        var ArticlesView = Backbone.View.extend({

            el: "#childContent",
            template: _.template(articleTemplate + articlePreviewModal),
            events: {
                'click .tbl-col': 'showDetails'
            },
            initialize: function () {
                this.render();
            },
            render: function () {
                this.$el.html(this.template(this.model));
                return this;
            },
            showDetails: function () {
                console.log('Show Details');
                router.navigate('/admin/articles/detail/' + 1, true);
            }

        });

        return ArticlesView;
    });