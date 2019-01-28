"use strict";

import GLOBAL from 'libs/globals.js';

module.exports = {
	name: 'VCharacter',

	data(){
		return {
			y: 50,
			gravity: 0
		};
	},

	methods: {
		update(fps){
			this.gravity += GLOBAL.GRAVITY * fps;
			this.y += this.gravity;
		},
		start(){
			this.gravity = 0;
			this.y = 50;
		},
		flap(){
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
