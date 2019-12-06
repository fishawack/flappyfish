"use strict";

import GLOBAL from '../../js/libs/globals.js';

var STATES = Object.freeze({
	"ALIVE": 1,
	"DEAD": 2,
	"FLAP": 3
});

export default {
	name: 'VCharacter',

	data(){
		return {
			y: 50,
			gravity: 0,
			state: STATES.ALIVE,
			clientHeight: null,
			clientRect: null,
			interval: null
		};
	},

	computed: {
		bound(){
			var y = this.y * 0.01;
			var height = this.clientRect.height * 0.5;
			var center = this.clientHeight * y;

			return {
				left: this.clientRect.left,
				right: this.clientRect.left + this.clientRect.width,
				top: center - height,
				bottom: center + height
			};
		},
		sprite(){
			if(this.state === STATES.FLAP){
				return '--Fish_Frame02';
			}
			else if(this.state === STATES.DEAD){
				return '--Fish_Frame_Hit01';
			}

			return '--Fish_Frame01';
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
			if(this.state !== STATES.DEAD){
				this.state = STATES.FLAP;

				if(this.interval){
					clearInterval(this.interval);
					this.interval = null;
				}

				this.interval = setInterval(() => {
					this.state = STATES.ALIVE;

					clearInterval(this.interval);
					this.interval = null;
				}, GLOBAL.FLAPLENGTH);

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
			
			if(this.interval){
				clearInterval(this.interval);
				this.interval = null;
			}
		},
		calculate(){
			// Get the use tag dimensions
			this.clientRect = this.$el.children[0].children[0].getBoundingClientRect();
			this.clientHeight = document.body.offsetHeight;
		}
	},

	mounted(){
		this.calculate();

		window.addEventListener('touchstart', (e) => {
			this.flap();
		});

		window.addEventListener('mousedown', (e) => {
			this.flap();
		});

		window.addEventListener('keydown', (e) => {
			if(e.code === "Space"){
				this.flap();
			}
		});
	}
};
