define(['jquery', 'underscore', 'backbone'],
    function ($, _, Backbone) {
        'use strict';

        var Constant = Backbone.View.extend({

            validate: function (val) {
                var b = false;
                if (val !== undefined && val !== '' && val !== null
                    && val !== 'undefined' && val !== 'null')
                    b = true;
                return b;
            },

            getAuthorizationToken: function () {
                var uname = sessionStorage.getItem('uname');
                var pass = sessionStorage.getItem('pass');
                return 'Basic ' + btoa(uname + ':' + pass);
            },

            getFormObj: function (id) {
                var paramObj = {};
                $.each($(id).serializeArray(), function (_, kv) {
                    paramObj[kv.name] = kv.value;
                });
                return paramObj;
            },

            i18n: function (view) {
                $(view.$el).i18n();
            },

            /**view
             * Unbind backbone view events and bind view events again
             * @param {any} view
             */
            forceEvents: function (view) {
                $(view.el).undelegate();
                view.delegateEvents();
            },

            summerNote: function (identifier, height = 300, tabsize = 2) {
                return $(identifier).summernote({
                    height: height,
                    tabsize: tabsize,
                    focus: true,
                    placeholder: 'Write your article. You can maximize the editor and write your content',
                });
            },

            layout: {
                child: '#childContent'
            },

            url: {
                category: {
                    get: '/api/category/all',
                    post: '/api/category/create'
                }
            },
            text: {
                role: {
                    user: 'USER',
                    admin: 'ADMIN'
                }
            },

            executeJqueryDep: function () {
                // Mobile dropdown
                $('.has-dropdown>a').on('click', function () {
                    $(this).parent().toggleClass('active');
                });

                // Aside Nav
                $(document).click(function (event) {
                    if (!$(event.target).closest($('#nav-aside')).length) {
                        if ($('#nav-aside').hasClass('active')) {
                            $('#nav-aside').removeClass('active');
                            $('#nav').removeClass('shadow-active');
                        } else {
                            if ($(event.target).closest('.aside-btn').length) {
                                $('#nav-aside').addClass('active');
                                $('#nav').addClass('shadow-active');
                            }
                        }
                    }
                });

                $('.nav-aside-close').on('click', function () {
                    $('#nav-aside').removeClass('active');
                    $('#nav').removeClass('shadow-active');
                });


                $('.search-btn').on('click', function () {
                    $('#nav-search').toggleClass('active');
                });

                $('.search-close').on('click', function () {
                    $('#nav-search').removeClass('active');
                });

                // Parallax Background
                $.stellar({
                    responsive: true
                });
            }
        });

        return Constant;
    });