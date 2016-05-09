"use strict";

//foursquare site and query parameters
var website = "https://api.foursquare.com/v2/venues/search?";
var clientId = "XQ10VUHAOTWOHQBPAJNBHI4I40FL2DHELNM5DQA5E0HL021C";
var clientSecret = "3OFU23ZLA2ZFJQGS2OUHC5BCSN0BVYSKZ3OZRFKN3N0QG42L";
var ver = "20130815";
var locationsNear = "St Louis, MO";
var query = "metrolink";

var url = website +
	"client_id=" + clientId +
	"&client_secret=" + clientSecret +
	"&v=" + ver +
	"&near=" + locationsNear +
	"&query=" + query;

var locationName = [];
var addr = [];

function getFoursquareData() {
	//AJAX call to get locations
	var jqxhr = $.get(url, function() {
			//console.log("ajax success");
		})
		.done(function(msg) {
			if (msg.response.venues.length > 0) {
				//iterate the response locations and load to an observablearray
				msg.response.venues.forEach(function(place) {
					if (place.location.state == "IL") {
						placeList.push(new Place(place));
					}
				});
			}
		//load knockout bindings
		loadBindings();
		})
		.fail(function() {
			//display message to user
			msgData("Foursquare processing failed. Please try again.");
			alert("Foursquare processing failed. Please try again.");
		})
		.always(function() {
			//console.log("ajax done");
		});
}

//Display map
$("#mapDiv").append(googleMap);