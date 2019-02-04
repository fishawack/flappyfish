<template>
	<div>
	    <div
	    	class="obstacle obstacle--top"
	    	:style="{
	    		'left': x + '%',
	    		'transform': 'translateX(-' + (100 - x) + '%) rotate(180deg) scaleX(-1)',
	    		'height': height[0]
	    	}"
		>
			<GIcon class="obstacle__icon" :name="spriteTop"/>
		</div>

		<div
	    	class="obstacle obstacle--bottom"
	    	:style="{
	    		'left': x + '%',
	    		'transform': 'translateX(-' + (100 - x) + '%)',
	    		'height': height[1]
	    	}"
		>
			<GIcon class="obstacle__icon" :name="spriteBottom"/>
		</div>
	</div>
</template>

<script src="./VObstacle.js"></script>