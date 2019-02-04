"use strict";

import GLOBAL from 'libs/globals.js';

module.exports = {
	name: 'VObstacle',

	data(){
		return {
			x: 100,
			y: ((Math.random() * ((100 - GLOBAL.GAPDIFF) - GLOBAL.GAP)) + (GLOBAL.GAP * 0.5)) + (GLOBAL.GAPDIFF * 0.5),
			gap: GLOBAL.GAP * 0.5
		};
	},

	methods: {
		update(delta){
			this.x -= GLOBAL.SPEED * delta;
		},
		bound(index){
			var bound = this.$el.children[index].getBoundingClientRect();

			return {
				left: bound.x,
				right: bound.x + bound.width,
				top: bound.y,
				bottom: bound.y + bound.height
			};
		},
		calculate(){
		}
	},

	mounted(){
		this.calculate();
	}
};