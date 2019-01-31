<template>
	<div>
	    <div
	    	class="obstacle obstacle--top"
	    	:style="{
	    		'left': x + '%',
	    		'transform': 'translateX(-' + (100 - x) + '%)',
	    		'height': (y - gap) + '%'
	    	}"
		></div>

		<div
	    	class="obstacle obstacle--bottom"
	    	:style="{
	    		'left': x + '%',
	    		'transform': 'translateX(-' + (100 - x) + '%)',
	    		'height': ((100 - y) - gap) + '%'
	    	}"
		></div>
	</div>
</template>

<script src="./VObstacle.js"></script>