define([
	'jquery',
	'underscore',
	'backbone',
	'scrollBar',
	'screenFull',
	'text!./landing.html',
	'../header/header-view',
	'./sidebar/sidebar-view',
    ], function($, _, Backbone, ScrollBar, Screenfull, landingTemplate, HeaderView, SidebarView){
	'use strict';
	
	var LandingView = Backbone.View.extend({
		
		el: '#mainContent',
		template: _.template(landingTemplate),
		events: {},
		initialize: function () {
			 this.render();
		},
		render: function(){
			console.log("Landing Page");
			this.$el.html(this.template());
			new SidebarView();
			new HeaderView();
			this.bindJQueryFunctions();
			return this;
		},
		setContent: function(view){
			if(this.view) this.view.close();
			this.view = view;
			this.view.$el.html(view);
		},
		
		bindJQueryFunctions: () => {
			var appSideBar = $(".app-sidebar"),
				sidebarContent = $(".sidebar-content"),
	            wrap = $(".wrapper"),
	            sideContent = document.querySelector(".sidebar-content");
			
			new ScrollBar(sideContent);	// {wheelSpeed: 5, wheelPropagation: !0, minScrollbarLength: 5 }
			$(".nav-toggle").on("click", function() {
				var e = $(this).find(".toggle-icon");
				"expanded" === e.attr("data-toggle") ? (wrap.addClass("nav-collapsed"), $(".nav-toggle").find(".toggle-icon").removeClass("ik-toggle-right").addClass("ik-toggle-left"), e.attr("data-toggle", "collapsed")) : (wrap.removeClass("nav-collapsed menu-collapsed"), $(".nav-toggle").find(".toggle-icon").removeClass("ik-toggle-left").addClass("ik-toggle-right"), e.attr("data-toggle", "expanded"));
			});
			$(".right-sidebar-toggle").on("click",function(e) {
	            this.classList.toggle('active');
	            $('.wrapper').toggleClass('right-sidebar-expand');
	            return false;
	        });
			appSideBar.on("mouseenter", function() {
	            if (wrap.hasClass("nav-collapsed")) {
	            	wrap.removeClass("menu-collapsed");
	                var e = $(".navigation-main .nav-item.nav-collapsed-open");
	                e.children(".submenu-content").hide().slideDown(300, function() {
	                    $(this).css("display", "")
	                }), sidebarContent.find(".nav-item.active").parents(".nav-item").addClass("open"), e.addClass("open").removeClass("nav-collapsed-open")
	            }
	        }).on("mouseleave", function(e) {
	            if (wrap.hasClass("nav-collapsed")) {
	            	wrap.addClass("menu-collapsed");
	                var s = $(".navigation-main .nav-item.open"),
	                    a = s.children(".submenu-content");
	                s.addClass("nav-collapsed-open"), a.show().slideUp(300, function() {
	                    $(this).css("display", "")
	                }), s.removeClass("open")
	            }
	        });
			/*
			 * $("#navbar-fullscreen").on("click", function(e) {
			 * console.log("screenfull:::::"); "undefined" != typeof screenfull &&
			 * screenfull.enabled && screenfull.toggle(); });
			 */
		}
		
	});
	return LandingView;
});