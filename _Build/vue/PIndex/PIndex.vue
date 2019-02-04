<template>
    <div :style="{'background-position-x': -x + 'px'}" class="background">
        <VCharacter ref="character"/>

		<div v-if="result" class="modal active">
			<div class="modal__container">
			    <div class="modal__box">
			    	<h2>Score:<span>{{score | toFixed('0')}}</span></h2>

			    	<form v-on:submit="submit" class="form" :class="{'active': !submitted}">
				    	<input v-model="name" placeholder="Name" required>
				    	<button class="button" type="submit">
				    		<span v-if="!submitted">Submit</span>
				    		<span v-else>Done</span>
				    	</button>
			    	</form>

			        <button v-on:click.stop="reset" class="button">Play Again</button>
			    </div>
		    </div>
		</div>

		<h2 class="ut-pin ut-right ut-top ut-margin-0">Score:<span>{{score | toFixed('0')}}</span></h2>
    </div>
</template>

<script src="./PIndex.js"></script>