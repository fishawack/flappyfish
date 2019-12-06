"use strict";

import "es6-promise/auto";

import Vue from 'vue';

(function(){
	if(navigator.userAgent === 'jsdom'){ return; }

	var Utility = window.Utility = require('./libs/utility');

	// Global filters
	require('./libs/filters');

	// Global components
	Vue.component('GIcon', require('../vue/GIcon/GIcon.vue').default);

	// Init vue instance
	var vue = new Vue({
		el: '#app',
		store: require('./libs/store'),
		router: require('./libs/routes').init(),
		data: {
			version: '',
			title: ''
		},
		// Pass through any data attributes on the root app element to the data object
		beforeMount: function () {
			for (var key in this._data) {
				if (this._data.hasOwnProperty(key) && this.$el.attributes.hasOwnProperty('data-' + key)) {
					if (typeof this[key] === 'object') {
						this[key] = JSON.parse(this.$el.attributes['data-' + key].value);
					} else {
						this[key] = this.$el.attributes['data-' + key].value;
					}
				}
			}
		},
		render: function (createElement) {
			return createElement(require('../vue/app/app.vue').default);
		}
	});

    require('fastclick')(document.body);

    // Used for capturing pdf as part of preprocess deploy
	if (Utility.parse_query_string(window.location.search.substring(1)).capture === 'true') {
		document.querySelector('html').classList.add('capture');
		window.capture = true;
	}

	document.querySelector('html').classList.remove('loading');
	document.querySelector('html').classList.add('loaded');
})();