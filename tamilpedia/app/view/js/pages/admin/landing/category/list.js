define(["jquery", "underscore", "backbone", "text!./templates/list.html", "text!./templates/category-modal.html", "pages/models/bbmodel"],
    function ($, _, Backbone, categoryTemplate, createCategoryModal, BBModel) {
        "use strict";

        var CategoriesView = Backbone.View.extend({
            el: "#childContent",
            template: _.template(categoryTemplate + createCategoryModal),
            initialize: function () {
                this.model = new BBModel();
                this.render();
                this.listenTo(this.model, "change", this.render);
            },
            render: function () {
                this.$el.html(this.template());
                return this;
            },
            events: {
                "submit #addCategoryForm": "createCategory"
            },

            init: function () {
                var self = this;
                /*app.getCategories().done(function (bookResponse) {
                    self.model.set("data", bookResponse.data);
                });*/
            },
            createCategory: function (ev) {
                ev.preventDefault();
                var obj = app.getFormObj(ev.target);
                console.log("addCategory = ", obj);
                var categoryObj = new BBModel({ url: app.url.post_category });
                $("#addCategoryModal").modal("hide");
                $(".modal-backdrop").remove();
                categoryObj.save(obj).done(() => {
                    this.init();
                });
            },
        });
        return CategoriesView;
    });