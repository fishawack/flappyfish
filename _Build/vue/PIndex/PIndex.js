"use strict";

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
			fps: 0,
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
				this.progress += 0.015 * this.fps;

				this.score += 0.0001 * this.fps;

				this.$refs.character.update(this.fps);

				if(this.$refs.character.y > 100){
					this.state = STATES.RESULT;
				}
			}
		},
		step(){
			var now = Date.now();
			var delta = (now - this.last) / 1000;
			this.last = now;
			this.fps = 1 / delta;

			this.update();
		    
		    window.requestAnimationFrame(this.step);
		},
		start(){
			this.score = 0;
			this.progress = 0;

			this.$refs.character.start();

			this.state = STATES.PLAYING;
		}
	},

	mounted(){
		window.requestAnimationFrame(this.step);
	},

	components: {
		VCharacter: require('../VCharacter/VCharacter.vue').default
	}
};
