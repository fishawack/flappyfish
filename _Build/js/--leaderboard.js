"use strict";

// Lab-d3 table component
import Table from 'table';
// Global vars
import GLOBAL from 'libs/globals.js';

(function(){
	// JSDOM check so scripts aren't ran on jsdom renders
	if(navigator.userAgent === 'jsdom'){ return; }

	// Lab-d3 code to render a table from a json data object
	var leaderboard = new Table('.js-leaderboard');

	leaderboard.init();

	// Commonly used utilitys bound to window object so it can be used in vue components easily
	var Utility = window.Utility = require('utility');

	// Constant 2 second ping for new data from the server
	function update(){
		Utility.load(GLOBAL.ENDPOINT + '/users', function(response){

			// Map data to Lab-d3 data structure
	    	var data = JSON.parse(response).map(function(d){
	    		return {
	    			key: d.id,
					values: [
						{
							key: "a" + d.id,
							value: d.name
						},
						{
							key: "b" + d.id,
							value: d.score
						}
					]
				};
	    	});

	    	// Sort by score then splice all but the first 10 results
	    	data.sort(function(a, b){
	    		return b.values[1].value - a.values[1].value;
	    	}).splice(10);

	    	// Add leaderboard number
	    	data.map(function(d, i){
				d.values.unshift({
					key: "c" + d.id,
					value: i + 1
				});
			});

	    	// Add headers
	    	data.unshift({
				values: [
					{
						value: ""
					},
					{
						value: "Name"
					},
					{
						value: "Score"
					}
				]
			});

	    	// Add data and render table
	    	leaderboard.data(data)
	    		.render();

	    	// Setup the next update call
	    	setTimeout(function(){
	    		update();
	    	}, 4000);
	    });
	}

	// Initial server call
	update();

	// Remove delay from iOS devices
    require('fastclick')(document.body);

    // Used for capturing pdf as part of preprocess deploy
	if (Utility.parse_query_string(window.location.search.substring(1)).capture === 'true') {
		document.querySelector('html').classList.add('capture');
		window.capture = true;
	}

	// Used for testing to determine if all the scripts are considered done
	document.querySelector('html').classList.remove('loading');
	document.querySelector('html').classList.add('loaded');
})();