<template>
    <div
    	class="obstacle"
    	:style="{
    		'left': x + '%',
    		'transform': 'translateX(-' + (100 - x) + '%)'
    	}"
	></div>
</template>

<script src="./VObstacle.js"></script>