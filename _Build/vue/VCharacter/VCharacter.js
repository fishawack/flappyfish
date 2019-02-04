"use strict";

import GLOBAL from 'libs/globals.js';

var STATES = Object.freeze({
	"ALIVE": 1,
	"DEAD": 2
});

module.exports = {
	name: 'VCharacter',

	data(){
		return {
			y: 50,
			gravity: 0,
			state: STATES.ALIVE,
			clientHeight: null,
			clientRect: null
		};
	},

	computed: {
		bound(){
			var y = this.y * 0.01;
			var height = this.clientRect.height * 0.5;
			var center = this.clientHeight * y;

			return {
				left: this.clientRect.x,
				right: this.clientRect.x + this.clientRect.width,
				top: center - height,
				bottom: center + height
			};
		}
	},

	methods: {
		update(delta){
			this.gravity += GLOBAL.GRAVITY * delta;

			if(this.gravity > GLOBAL.GRAVITYMAX * delta){
				this.gravity = GLOBAL.GRAVITYMAX * delta;
			}

			this.y += this.gravity;

			if(this.y > 100){
				this.y = 100;
			}
		},
		reset(){
			this.gravity = 0;
			this.y = 50;
			this.state = STATES.ALIVE;
		},
		flap(){
			if(this.state === STATES.ALIVE){
				if(this.gravity >= 0){
					this.gravity = -GLOBAL.FLAP;
				} else {
					this.gravity -= GLOBAL.FLAP;

					if(this.gravity < GLOBAL.FLAPMAX){
						this.gravity = -GLOBAL.FLAPMAX;
					}
				}
			}
		},
		kill(){
			this.state = STATES.DEAD;
		},
		calculate(){
			this.clientRect = this.$el.getBoundingClientRect();
			this.clientHeight = document.body.offsetHeight;
		}
	},

	mounted(){
		this.calculate();

		window.addEventListener('click', (e) => {
			this.flap();
		});

		window.addEventListener('keyup', (e) => {
			if(e.code === "Space"){
				this.flap();
			}
		});
	}
};
