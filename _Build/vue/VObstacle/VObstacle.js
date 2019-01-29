"use strict";

import GLOBAL from 'libs/globals.js';

module.exports = {
	name: 'VObstacle',

	data(){
		return {
			x: 100
		};
	},

	methods: {
		update(delta){
			this.x -= GLOBAL.SPEED * delta;
		}
	},

	mounted(){
	}
};
