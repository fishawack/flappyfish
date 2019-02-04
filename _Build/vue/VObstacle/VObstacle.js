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
			clientRect: null,
			timeoutTop: null,
			timeoutBottom: null,
			stateTop: false,
			stateBottom: false
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
		},
		spriteTop(){
			if(this.stateTop){
				return '--Tentacle_Frame02';
			}

			return '--Tentacle_Frame01';
		},
		spriteBottom(){
			if(this.stateBottom){
				return '--Tentacle_Frame02';
			}

			return '--Tentacle_Frame01';
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
		},
		animateTop(index){
			this.timeoutTop = setTimeout(() => {
				this.stateTop = !this.stateTop;

				this.animateTop();
			}, (Math.random() * 1000) + 500);
		},
		animateBottom(index){
			this.timeoutBottom = setTimeout(() => {
				this.stateBottom = !this.stateBottom;

				this.animateBottom();
			}, (Math.random() * 1000) + 500);
		}
	},

	mounted(){
		this.$nextTick(function(){
			this.calculate();

			this.animateTop();
			this.animateBottom();
		});
	},

	beforeDestroy(){
		clearTimeout(this.timeoutTop);
		this.timeoutTop = null;

		clearTimeout(this.timeoutBottom);
		this.timeoutBottom = null;
	}
};