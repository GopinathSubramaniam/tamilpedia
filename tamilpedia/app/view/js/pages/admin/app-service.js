define(['underscore', 'backbone', '../models/bbmodel'],
    function (_, Backbone, BBModel) {
        'use strict';

        var AppService = Backbone.View.extend({
            getCategoryList: function () {
                var model = new BBModel({ url: app.url.category.get });
                return model.fetch();
            },
            getTags: function () {
                var model = new BBModel({ url: app.url.category.get });
                return model.fetch();
            }
        });

        return new AppService();
    });