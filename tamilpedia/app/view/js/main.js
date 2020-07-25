"use strict";

require.config({
   shim: {
      underscore: {
         exports: "_"
      },
      backbone: {
         deps : ["jquery", "jqueryStellar", "underscore"],
         exports: "Backbone"
      },
      backboneLocalstorage:{
         deps: ["backbone"],
         exports: "Store"
      },
      bootstrap: {
    	  deps: ["jquery"],
    	  exports: "Bootstrap"
      },
      treeview: ["jquery", "bootstrap"],
      i18n: ["jquery"],
      messagestore: ["i18n"],
      fallbacks: ["messagestore"],
      language: ["fallbacks"],
      parser: ["language"],
      emitter: ["parser"],
      emitterBidi: ["emitter"],
      app: ["underscore", "backbone", "bootstrap", "messagestore", "emitterBidi"],
   },
   paths: {
      jquery: "../lib/js/jquery.min",
      bootstrap: "../lib/js/bootstrap.min",
      jqueryStellar: "../lib/js/jquery.stellar.min",
      underscore: "../node_modules/underscore/underscore",
      backbone: "../node_modules/backbone/backbone",
      backboneLocalStorage: "../node_modules/backbone.localstorage/backbone.localStorage",
      text: "../node_modules/requirejs-text/text",
      treeview: "../lib/js/plugins/tree/gijgo.min",
      i18n: "../lib/js/i18n/jquery.i18n.min",
      messagestore: "../lib/js/i18n/jquery.i18n.messagestore.min",
      fallbacks: "../lib/js/i18n/jquery.i18n.fallbacks.min",
      language: "../lib/js/i18n/jquery.i18n.language.min",
      parser: "../lib/js/i18n/jquery.i18n.parser.min",
      emitter: "../lib/js/i18n/jquery.i18n.emitter.min",
      emitterBidi: "../lib/js/i18n/jquery.i18n.emitter.bidi.min",
      app: "app"
   }
});

var app = null;
require(["app"], function(App){
	$.i18n().load({"en": "view/i18n/en.json", "ta": "view/i18n/ta.json"}).done(function() {
		$.i18n( {locale: "en"} );
		$("body").i18n();
    });
});