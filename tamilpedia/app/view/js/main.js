"use strict";

require.config({
   shim: {
      underscore: {
         exports: "_"
      },
      backbone: {
         deps : ["jquery", "underscore"],
         exports: "Backbone"
      },
      backboneLocalstorage:{
         deps: ["backbone"],
         exports: "Store"
      },
      popper: ["jquery"],
      bootstrap: {
    	  deps: ["popper", "moment"],
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
      app: ["underscore", "backbone", "bootstrap", "treeview", "messagestore", "emitterBidi"],
      summerNote: ["jquery", "bootstrap"]
   },
   map: {
	    "*": {
	      "popper.js": "popper"
	    }
   },
   paths: {
      jquery: "../lib/js/plugins/jquery/jquery-3.3.1.min",
      underscore: "../node_modules/underscore/underscore",
      backbone: "../node_modules/backbone/backbone",
      backboneLocalstorage: "../node_modules/backbone.localstorage/backbone.localStorage",
      text: "../node_modules/requirejs-text/text",
      popper: "../lib/js/plugins/popper.js/dist/umd/popper.min",
      bootstrap: "../lib/js/plugins/bootstrap/dist/js/bootstrap.min",
      scrollBar: "../lib/js/plugins/perfect-scrollbar/dist/perfect-scrollbar.min",
      screenFull: "../lib/js/plugins/screenfull/dist/screenfull",
      jqueryDataTable: "../lib/js/plugins/datatables.net/js/jquery.dataTables.min",
      bootDataTable: "../lib/js/plugins/datatables.net-bs4/js/dataTables.bootstrap4.min",
      dataTableRes: "../lib/js/plugins/datatables.net-responsive/js/dataTables.responsive.min",
      bootDataTableRes: "../lib/js/plugins/datatables.net-responsive-bs4/js/responsive.bootstrap4.min",
      moment: "../lib/js/plugins/moment/moment",
      treeview: "../lib/js/plugins/tree/gijgo.min",
      i18n: "../lib/js/plugins/i18n/jquery.i18n.min",
      messagestore: "../lib/js/plugins/i18n/jquery.i18n.messagestore.min",
      fallbacks: "../lib/js/plugins/i18n/jquery.i18n.fallbacks.min",
      language: "../lib/js/plugins/i18n/jquery.i18n.language.min",
      parser: "../lib/js/plugins/i18n/jquery.i18n.parser.min",
      emitter: "../lib/js/plugins/i18n/jquery.i18n.emitter.min",
      emitterBidi: "../lib/js/plugins/i18n/jquery.i18n.emitter.bidi.min",
      summerNote: "../lib/js/plugins/summernote/dist/summernote-bs4.min",
      theme: "../lib/js/dist/js/theme.min",
      app: "app",
   }
});

var app = null;
require(["app"], function(App){
	$.i18n().load({"en": "view/i18n/en.json", "ta": "view/i18n/ta.json"}).done(function() {
		$.i18n( {locale: "en"} );
		$("body").i18n();
    });
});