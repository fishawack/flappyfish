<template>
    <div :style="{'background-position-x': -progress + 'px'}" class="background">
        <VCharacter ref="character" />

        <VObstacle ref="obstacle"/>

		<div v-if="result" class="modal active">
			<div class="modal__container">
			    <div class="modal__box">
			    	<h2>Score:<span>{{score | toFixed('0')}}</span></h2>
			        <button v-on:click.stop="reset" class="button">Play Again</button>
			    </div>
		    </div>
		</div>

		<h2 class="ut-pin ut-right ut-top ut-margin-0">Score:<span>{{score | toFixed('0')}}</span></h2>
    </div>
</template>

<script src="./PIndex.js"></script>