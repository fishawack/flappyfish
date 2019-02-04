<template>
	<div>
	    <div
	    	class="obstacle obstacle--top"
	    	:style="{
	    		'left': x + '%',
	    		'transform': 'translateX(-' + (100 - x) + '%)',
	    		'height': height[0]
	    	}"
		></div>

		<div
	    	class="obstacle obstacle--bottom"
	    	:style="{
	    		'left': x + '%',
	    		'transform': 'translateX(-' + (100 - x) + '%)',
	    		'height': height[1]
	    	}"
		></div>
	</div>
</template>

<script src="./VObstacle.js"></script>