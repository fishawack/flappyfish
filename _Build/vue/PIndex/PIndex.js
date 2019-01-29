"use strict";

import GLOBAL from 'libs/globals.js';

var STATES = Object.freeze({
	"WAIT": 1,
	"PLAYING": 2,
	"RESULT": 3
});

module.exports = {
	name: 'PIndex',

	data(){
		return {
			last: Date.now(),
			delta: 0,
			state: STATES.WAIT,
			progress: 0,
			score: 0
		};
	},

	computed: {
		waiting(){
			return this.state === STATES.WAIT;
		},
		playing(){
			return this.state === STATES.PLAYING;
		},
		result(){
			return this.state === STATES.RESULT;
		}
	},

	methods: {
		update(){
			if(this.state === STATES.PLAYING){
				this.progress += GLOBAL.BGSPEED * this.delta;

				this.score += 1 * this.delta;

				this.$refs.character.update(this.delta);
				this.$refs.obstacle.update(this.delta);

				if(this.$refs.character.y > 100){
					this.state = STATES.RESULT;
				}
			}
		},
		step(){
			var now = Date.now();
			this.delta = (now - this.last) / 1000;
			this.last = now;

			this.update();
		    
		    window.requestAnimationFrame(this.step);
		},
		start(){
			this.state = STATES.PLAYING;
		},
		reset(){
			this.score = 0;
			this.progress = 0;

			this.$refs.character.reset();

			this.state = STATES.WAIT;
		}
	},

	mounted(){
		window.requestAnimationFrame(this.step);

		window.addEventListener('click', (e) => {
			if(this.state === STATES.WAIT){
				this.state = STATES.PLAYING;
			}
		});
	},

	components: {
		VCharacter: require('../VCharacter/VCharacter.vue').default,
		VObstacle: require('../VObstacle/VObstacle.vue').default
	}
};
