<template>
    <div :style="{'background-position-x': -x + 'px'}" class="background">
        <VCharacter ref="character"/>

		<div v-if="result" class="modal active">
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
								<span>(Optional) Please confirm whether you agree to be contacted</span>
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
		    </div>
		</div>

		<h2 class="score"><span>{{score | toFixed('0')}}</span><br>Score</h2>
    </div>
</template>

<script src="./PIndex.js"></script>