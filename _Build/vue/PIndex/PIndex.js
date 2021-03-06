"use strict";

import GLOBAL from '../../js/libs/globals.js';
import Obstacle from '../VObstacle/VObstacle.vue';
import Vue from 'vue';
import FPSMeter from 'fpsmeter';

if(process.env.NODE_ENV === "development"){
	var meter = new window.FPSMeter();
}

var ObstacleClass = Vue.extend(Obstacle);

var STATES = Object.freeze({
	"WAIT": 1,
	"PLAYING": 2,
	"RESULT": 3
});

export default {
	name: 'PIndex',

	data(){
		return {
			last: window.performance.now(),
			delta: 0,
			state: STATES.WAIT,
			x: 0,
			score: 0,
			obstacles: [],
			interval: null,
			name: "",
			email: "",
			submitted: false,
			contact: false,
			invalid: false,
			link: ''
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
			if(this.state === STATES.PLAYING || this.state === STATES.RESULT){
				this.$refs.character.update(this.delta);
			}

			if(this.state === STATES.PLAYING){
				this.x += GLOBAL.BGSPEED * this.delta;

				if(this.obstacles.length){
					for(var i = this.obstacles.length; i--;){
						this.obstacles[i].update(this.delta);

						var char = this.$refs.character.bound;

						var obst = this.obstacles[i].bound;

						obst = [
							obst[0],
							obst[1]
						];

						for(var j = obst.length; j--;){
							if(!(
									char.left > obst[j].right ||
							        char.right < obst[j].left ||
							        (char.top > obst[j].bottom && char.bottom > 0) || 
							        (char.bottom < obst[j].top && char.bottom > 0)
						        )){
								this.end();
								return;
							}
						}
					}

					if(this.obstacles[0].x < 0){
						this.destroyObstacle();
					}
				}

				if(this.$refs.character.y >= 100){
					this.end();
				}	
			}
		},
		frame(){
			if(process.env.NODE_ENV === "development"){
				meter.tickStart();
			}

			var now = window.performance.now();

			this.delta = Math.min(1, (now - this.last) / 1000);

			this.update(GLOBAL.STEP);

			this.last = now;

			if(process.env.NODE_ENV === "development"){
				meter.tick();
			}
		    
		    window.requestAnimationFrame(this.frame);
		},
		start(){
			this.state = STATES.PLAYING;

			this.interval = setInterval(() => {
				if(this.state === STATES.PLAYING){
					if(this.obstacles.length){
						this.score += 1;
					}

					this.createObstacle();
				}
			}, GLOBAL.FREQUENCY);
		},
		reset(){
			this.score = 0;
			this.x = 0;

			this.$refs.character.reset();

			clearInterval(this.interval);
			this.interval = null;
			this.submitted = false;
			this.invalid = false;

			this.name = '';
			this.email = '';
			this.contact = false;

			for(var i = this.obstacles.length; i--;){
				this.destroyObstacle();
			}

			this.state = STATES.WAIT;
		},
		submit(e){
			e.preventDefault();

			if(this.submitted){
				return;
			}

			if(this.name === "" || this.email === ""){
				this.invalid = true;

				return;
			}

			this.submitted = true;
			this.invalid = false;

			window.Utility.send(GLOBAL.ENDPOINT + '/users', {
				score: this.score, 
				name: this.name,
				email: this.email,
				contact: this.contact
			});
		},
		end(){
			this.$refs.character.kill();

			this.state = STATES.RESULT;
		},
		createObstacle(){
			var instance = new ObstacleClass();
			instance.$mount();
			this.obstacles.push(instance);
			this.$el.appendChild(instance.$el);
		},
		destroyObstacle(){
			var hold = this.obstacles.shift();

			hold.$destroy();
			hold.$el.remove();
			hold = null;
		},
		focusInput: function(el){
			el.target.focus();
		}
	},

	mounted(){
		window.requestAnimationFrame(this.frame);

		window.addEventListener('click', (e) => {
			if(this.state === STATES.WAIT){
				this.start();
			}
		});

		window.addEventListener('keyup', (e) => {
			if(
				e.code === "Space" && 
				this.state === STATES.WAIT
			){
				this.start();
			}
		});

		window.addEventListener('resize', (e) => {
			this.$refs.character.calculate();

			for(var i = this.obstacles.length; i--;){
				this.obstacles[i].calculate();
			}
		});

		window.Utility.load('http://portfolio-cms.fishawack.staging/wp-json/wp/v2/articles', (data) => {
			let json = JSON.parse(data);

			let latest = json.sort((a, b) => {
				return new Date(b.modified).getTime() - new Date(a.modified).getTime();
			})[0];

			this.link = `http://portfolio.fishawack.solutions/#/article/${latest.title.rendered}?id=${latest.id}`;
		});
	},

	components: {
		VCharacter: require('../VCharacter/VCharacter.vue').default
	}
};
