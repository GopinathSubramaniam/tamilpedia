define([ 'jquery', 'underscore', 'backbone' ], function($, _, Backbone) {
	'use strict';

	var BBModel = Backbone.Model.extend({
		initialize : function(props) {
			if(props && props.url) this.url = props.url;
		},
		data: {}
	});

	return BBModel;
});
