(function (root, factory) {
	"use strict";
	/* istanbul ignore next */
	if (typeof define === 'function' && define.amd) {
		/* istanbul ignore next */
		define(
				'vue-router', 
				'vue', 
			factory);
	} else if (typeof exports === 'object') {
		module.exports = factory(
				require('vue-router').default, 
				require('vue').default
			);
	} else {
		/* istanbul ignore next */
		root.Routes = factory(
				root.VueRouter, 
				root.Vue
			);
	}
	/* istanbul ignore next */
})(this || window, function (VueRouter, Vue) {
	"use strict";

	Vue.use(VueRouter);

	return {
		init: function () {
			return new VueRouter({
				linkExactActiveClass: 'active',
				routes: [
					{
						path: '/',
						component: require('../../vue/PIndex/PIndex.vue').default,
						name: 'index'
					}
				],
			});
		}
	};
});