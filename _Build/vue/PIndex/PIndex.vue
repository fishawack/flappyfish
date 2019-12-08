<template>
    <div :style="{'background-position-x': -x + 'px'}" class="background">
        <VCharacter ref="character"/>

        <div
        	v-if="waiting"
        	class="
				start
        	"
    	>
        	<h2>Welcome to</h2>
        	<h1>Christmas jumper</h1>
        	<p>Survive for <span class="ut-highlight">15 jumps</span> to unlock todays digital highlight</p>
        	<p>Press space bar to begin</p>
        </div>

		<!-- Flappyfish end screen -->
		<!-- <div v-if="result" class="modal active">
			<div class="modal__container">
			    <div class="modal__box ut-relative">
			    	<h2 class="ut-marginTop ut-marginBottom-2">Final score: <span>{{score | toFixed('0')}}</span></h2>

			    	<form v-on:submit="submit" class="form" :class="{'active': !submitted}">

			    		<div class="form__group" :class="{'active': (invalid && name === '')}">
				    		<input v-on:click="focusInput" :disabled="submitted" class="form__input" type="text" v-model="name" placeholder="Name" required>
			    		</div>

				    	<div class="form__group" :class="{'active': (invalid && email === '')}">
				    		<input v-on:click="focusInput" :disabled="submitted" class="form__input" type="email" v-model="email" placeholder="Email" required>
			    		</div>

			    		<div class="form__group">
							<input :disabled="submitted" class="checkbox" name="cboxes" type="checkbox" id="cbox1" v-model="contact" />
							<label class="checkbox__label" for="cbox1">
								<span class="checkbox__icon"></span>
								<span>Please confirm you agree to be contacted</span>
							</label>
						</div>

						<div class="ut-textAlignRight ut-marginTop-2">
							<button class="button" type="submit">
					    		<span v-if="!submitted">Submit</span>
					    		<span v-else>Done</span>
					    	</button>
				    	</div>
			    	</form>

			    	<button v-on:click.stop="reset" class="button ut-marginTop form__button">Play Again</button>
			    </div>

			    <a class="button ut-pin ut-right ut-bottom ut-onTop" target="_blank" href="leaderboard.html">Leaderboard</a>
		    </div>
		</div> -->

		<div v-if="result" class="modal active">
			<div class="modal__container">
			    <div class="modal__box ut-relative modal__box--alt">
			    	<h2 class="ut-marginTop ut-marginBottom-2">Final score: <span>{{score | toFixed('0')}}</span></h2>
	
					<div v-if="score < 15">
				    	<h3>Too Bad</h3>

				    	<p><span class="ut-highlight">Try again</span> to unlock today's digital highlight</p>

				    	<button v-on:click.stop="reset" class="button ut-fullWidth ut-borderBox ut-marginTop-2">Try Again</button>

				    	<a class="button button--alt ut-fullWidth ut-borderBox ut-marginTop-2" target="_blank" :href="link">Bah humbug! just show me</a>
				    </div>
				    <div v-else>
				    	<h3>You did it!</h3>

				    	<a class="button ut-fullWidth ut-borderBox ut-marginTop-2" target="_blank" :href="link">Show me the highlight</a>

				    	<button v-on:click.stop="reset" class="button button--alt ut-fullWidth ut-borderBox ut-marginTop">Play Again</button>
				    </div>
				</div>
		    </div>
		</div>

		<h2 class="score"><span>{{score | toFixed('0')}}</span><br>Score</h2>
    </div>
</template>

<script src="./PIndex.js"></script>