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
			state: STATES.ALIVE
		};
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
		bound(){
			var bound = this.$el.getBoundingClientRect();

			return {
				left: bound.x,
				right: bound.x + bound.width,
				top: bound.y,
				bottom: bound.y + bound.height
			};
		},
		kill(){
			this.state = STATES.DEAD;
		}
	},

	mounted(){
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
