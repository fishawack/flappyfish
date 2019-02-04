"use strict";

import GLOBAL from 'libs/globals.js';

module.exports = {
	name: 'VObstacle',

	data(){
		return {
			x: 100,
			y: ((Math.random() * ((100 - GLOBAL.GAPDIFF) - GLOBAL.GAP)) + (GLOBAL.GAP * 0.5)) + (GLOBAL.GAPDIFF * 0.5),
			gap: GLOBAL.GAP * 0.5,
			clientWidth: null,
			clientRect: null
		};
	},

	computed: {
		bound(){
			var x = this.x * 0.01;
			var width = this.clientRect[0].width * ((100 - this.x) * 0.01);
			var center = this.clientWidth * x;

			center -= width;

			return [
				{
					left: center,
					right: center + this.clientRect[0].width,
					top: this.clientRect[0].top,
					bottom: this.clientRect[0].top + this.clientRect[0].height
				},
				{
					left: center,
					right: center + this.clientRect[1].width,
					top: this.clientRect[1].top,
					bottom: this.clientRect[1].top + this.clientRect[1].height
				}
			];
		},
		height(){
			return [
				(this.y - this.gap) + '%',
				((100 - this.y) - this.gap) + '%'
			];
		}
	},

	methods: {
		update(delta){
			this.x -= GLOBAL.SPEED * delta;
		},
		calculate(){
			this.clientRect = [
				this.$el.children[0].getBoundingClientRect(),
				this.$el.children[1].getBoundingClientRect()
			];

			this.clientWidth = document.body.offsetWidth;
		}
	},

	mounted(){
		this.$nextTick(function(){
			this.calculate();
		});
	}
};