"use strict";

// declares a global map variable
var map;

var googleMap = '<div class="map" id="map"></div>';

//locations array contains longitude and latitude of locations
var locations = [];

//placeAssociation is used to match foursquare location with google maps location
var placeAssociation = {
	"locations": []
};

//locationInfo for infowindow data
var locationInfo = "";

//array of all markers
var allMarkers = [];

//Handle Google Map error
function googleError() {
	//display message to user
	alert("Google Map processing failed. Please try again.");
}

//icon object
var markerIcon = new MarkerIcon();
//icons
function MarkerIcon() {
	this.red = "./images/red.png",
		this.yellow = "./images/yellow.png",
		this.rail = "./images/rail.png";
}

//Start here! initializeMap() is called when page is loaded.
function initializeMap() {

	var mapOptions = {
		disableDefaultUI: true
	};

	//For the map to be displayed, the googleMap var must be appended to #mapDiv
	map = new google.maps.Map(document.querySelector('#map'), mapOptions);

	//returns an array of every location, and stores an array of association between foursquare and google 
	function locationFinder() {
		//iterate locations
		ko.utils.arrayForEach(placeList(), function(place) {
			var lat = place.lat;
			var lng = place.lng;
			var id = place.id;
			//put location lat/lng in an array
			locations.push(lat + ", " + lng);
			//put foursquare location id in json obj
			placeAssociation.locations.push({
				"foursquare": id,
				"google": "pending"
			});
		});
		return locations;
	}

	/*
	pinPoster(locations) takes in the array of locations created by locationFinder()
	and fires off Google place searches for each location
	*/
	function pinPoster(locations) {
		// creates a Google place search service object. PlacesService does the work of
		// actually searching for location data.
		var service = new google.maps.places.PlacesService(map);
		// Iterates through the array of locations, creates a search object for each location
		locations.forEach(function(place) {
			// the search request object
			var request = {
				query: place
			};
			// Actually searches the Google Maps API for location data and runs the callback
			// function with the search results after each search.
			service.textSearch(request, callback);
		});
	}

	/*
  callback(results, status) makes sure the search returned results for a location.
  If so, it creates a new map marker for that location.
  */

	//if status is ok, then call createMapMarker
	function callback(results, status) {

		var places = placeAssociation.locations;

		if (status == google.maps.places.PlacesServiceStatus.OK) {
			createMapMarker(results[0]);
			var googleLat = results[0].geometry.location.lat();
			var googleLng = results[0].geometry.location.lng();
			//Return the foursquare id that is associated with the map marker
			var foursquareId = LocationMatch(googleLat, googleLng);
			//iterate placeAssociation
			placeAssociation.locations.forEach(function(place) {
				//if iteration matches foursquare id, the enter google map id
				if (foursquareId == place.foursquare) {
					place.google = results[0].id;
				}
			});
		} else if (status == google.maps.places.PlacesServiceStatus.OVER_QUERY_LIMIT) {
			console.log("OVER_QUERY_LIMIT");
		}
	}

	// Sets the boundaries of the map based on pin locations
	window.mapBounds = new google.maps.LatLngBounds();

	// locations is an array of location strings returned from locationFinder()
	locations = locationFinder();

	// pinPoster(locations) creates pins on the map for each location in
	// the locations array
	pinPoster(locations);
}

// createMapMarker(placeData) reads Google Places search results to create map pins.
// placeData is the object returned from search results containing information
// about a single location.
function createMapMarker(placeData) {
	// The next lines save location data from the search result object to local variables
	var googleLat = placeData.geometry.location.lat(); // latitude from the place service
	var googleLng = placeData.geometry.location.lng(); // longitude from the place service
	var bounds = window.mapBounds; // current boundariesnew google.maps.Map of the map window
	// marker is an object with additional data about the pin for a single location
	var marker = new google.maps.Marker({
		map: map,
		position: placeData.geometry.location,
		id: placeData.id,
		//title: placeData.geometry.location.name();,
		animation: google.maps.Animation.DROP,
		icon: markerIcon.yellow
	});

	//Put marker in an array of markers
	allMarkers.push(marker);

	//click listener for the markers
	marker.addListener('click', toggleBounce);

	//bounce marker
	function toggleBounce() {
		if (marker.getAnimation() !== null) {
			marker.setAnimation(null);
		} else {
			//bounce one time
			marker.setAnimation(google.maps.Animation.BOUNCE);
			setTimeout(function() {
				marker.setAnimation(null);
			}, 750);
		}
	}

	//Change color of marker when clicked and show info window
	google.maps.event.addListener(marker, 'click', function() {
		//Hide tooltip on click event
		showToolTip(false);
		//Return the foursquare id that is associated with the map marker
		var foursquareId = LocationMatch(googleLat, googleLng);
		//Get info window data for the correct place
		locationInfo = getInfoWindowData(foursquareId);
		//reset marker color and close info window
		resetMarkers();
		//set marker icon
		marker.setIcon(markerIcon.rail);
		//set location information
		marker.infowindow.setContent(locationInfo);
		//open info window
		marker.infowindow.open(map, marker);
	});

	//make infowindow accessable outside of this scope
	marker['infowindow'] = new google.maps.InfoWindow({
		content: locationInfo
	});

	//Show tooltip on mouseover
	google.maps.event.addListener(marker, 'mouseover', function() {
		//Return the foursquare id that is associated with the map marker
		var foursquareId = LocationMatch(googleLat, googleLng);
		//loop place list to get correct marker location
		ko.utils.arrayForEach(placeList(), function(place) {
			if (foursquareId == place.id) {
				marker.tooltipContent = place.name;
			}
		});
		//show the tooltip
		var point = fromLatLngToPoint(marker.getPosition(), map);
		//set tooltip observable values
		toolTip(point.x, point.y, marker.tooltipContent);
	});
	google.maps.event.addListener(marker, 'mouseout', function() {
		//Hide tooltip on mouseout
		showToolTip(false);
	});

	function fromLatLngToPoint(latLng, map) {
		var topRight = map.getProjection().fromLatLngToPoint(map.getBounds().getNorthEast());
		var bottomLeft = map.getProjection().fromLatLngToPoint(map.getBounds().getSouthWest());
		var scale = Math.pow(2, map.getZoom());
		var worldPoint = map.getProjection().fromLatLngToPoint(latLng);
		return new google.maps.Point((worldPoint.x - bottomLeft.x) * scale, (worldPoint.y - topRight.y) * scale);
	}

	var infowindow = new google.maps.InfoWindow({
		maxWidth: 300
	});

	// this is where the pin actually gets added to the map.
	// bounds.extend() takes in a map location object
	bounds.extend(new google.maps.LatLng(googleLat, googleLng));
	// fit the map to the new marker
	map.fitBounds(bounds);
	// center the map
	map.setCenter(bounds.getCenter());
}

//reset marker color and close info window
function resetMarkers() {
	//iterate the markers
	allMarkers.forEach(function(marker) {
		marker.infowindow.close();
		marker.setIcon(markerIcon.yellow);
	});
}

//return the infowindow data
function getInfoWindowData(id) {
	//loop placeList array
	ko.utils.arrayForEach(placeList(), function(place) {
		if (place.id == id) {
			locationInfo = '<div id="content">' +
				'<div id="siteNotice"></div>' +
				'<div id="bodyContent">' +
				'<h1 id="firstHeading" class="firstHeading">' + place.name + '</h1>' +
				'<p>Address: ' + place.address + '<br>' +
				'City: ' + place.city + '<br>' +
				'State: ' + place.state + '<br>' +
				'Lat: ' + place.lat + '<br>' +
				'Lng: ' + place.lng + '</p>' +
				'<a href="http://www.metrostlouis.org" ' +
				'target="_blank">St.Louis Metrolink</a>' +
				'</div>' +
				'</div>';
		}
	});
	return locationInfo;
}

//Return the foursquare location that matches Google maps location
function LocationMatch(googleLat, googleLng) {
	//round to the thousandth
	var gLat = Math.round(1000 * googleLat) / 1000;
	var gLng = Math.round(1000 * googleLng) / 1000;
	var placeId;
	//iterate locations array to match results
	ko.utils.arrayForEach(placeList(), function(place) {
		var latDifference = Math.abs(place.lat - gLat).toFixed(3);
		var lngDifference = Math.abs(place.lng - gLng).toFixed(3);
		if (latDifference <= 0.001 && lngDifference <= 0.001) {
			placeId = place.id;
		}
	});
	return placeId;
}

// Calls the initializeMap() function when the page loads
window.addEventListener('load', initializeMap);

// Vanilla JS way to listen for resizing of the window
// and adjust map bounds
window.addEventListener('resize', function(e) {
	//Make sure the map bounds get updated on page resize
	map.fitBounds(mapBounds);
});