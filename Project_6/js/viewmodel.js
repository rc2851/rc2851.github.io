var Place = function(place){
	this.id = ko.observable(place.id);
	this.name = ko.observable(place.name.substring(12));
	this.address = ko.observable(place.location.address);
	this.city = ko.observable(place.location.city);
	this.state = ko.observable(place.location.state);
	this.lat = ko.observable(place.location.lat);
	this.lng = ko.observable(place.location.lng);
}

//placeList locations are loaded from ajax
var placeList = ko.observableArray([]);

var ViewModel = function(){
	var self = this;
	//Current place observable
	this.currentPlace = ko.observable(this.placeList()[1]);
	//Set current place clicked
	this.setPlace = function(clickedPlace){
		//Put clicked place in currentPlace observable
		self.currentPlace(clickedPlace);
		//placeAssociation, makes an association between foursquare and google maps locations  
		var places = placeAssociation.locations;
		for(var i in places){
			if(self.currentPlace().id() == places[i].foursquare){
				//loop markers
				allMarkers.forEach(function(marker){
					//close all infowindow that may be open
					marker.infowindow.close();
					//set the marker color
					marker.setIcon(markerIcon.yellow);
					if(marker.id == places[i].google){
						//change the color of this marker
						marker.setIcon(markerIcon.rail);
						//bounce the this marker
						marker.setAnimation(google.maps.Animation.BOUNCE);
						setTimeout(function(){ marker.setAnimation(null); }, 750);
						//set infowindow location information
						marker.infowindow.setContent(getInfoWindowData(currentPlace().id()));
						//marker.showInfoWindow();
						marker.infowindow.open(map, marker);						
					}
				});
			}
		}
	}
	
	self.selectedChoice = ko.observable();

	//Function called when there is a change in the select list dropdown
    self.selectPlace = function(){	
		//Set current place from select list
		ko.utils.arrayForEach(this.placeList(), function(place){
			if(this.selectedChoice() != undefined){
				if ((place.name().toLowerCase().indexOf(this.selectedChoice().toLowerCase()) >= 0)) { 
					setPlace(place);
				};
			};
		});
    };

	//search observable
	query = ko.observable('');
	//searchList array to hold search matches
	searchList = ko.observableArray([]);

	searchResults = ko.computed(function() {
		//clear select listbox
		self.selectedChoice(null);
		//rest markers to default icon
		allMarkers.forEach(function(marker){
			//close all infowindow that may be open
			marker.infowindow.close();
			marker.setIcon(markerIcon.yellow);
		});
		if(query().length > 0){			
			//hide all markers and close info window
			allMarkers.forEach(function(marker){
				marker.setVisible(false);
			});
			//Remove items in array
			searchList.removeAll();
			//iterate placeList array
			ko.utils.arrayForEach(this.placeList(), function(place) {
				if ((place.name().toLowerCase().indexOf(query().toLowerCase()) >= 0) && (query().length > 0)) { 
					//put this location in the searchList array
					searchList.push(place);
					//show markers associated with search list
					placeAssociation.locations.forEach(function(placeAssoc) {
						if (place.id() == placeAssoc.foursquare) {
							//loop markers to set associated marker visible
							allMarkers.forEach(function(marker){
								if(placeAssoc.google == marker.id){
									marker.setVisible(true);
								}
							});
						}	
					});
				}
				//show/hide search list
				if(searchList().length > 0){
					$("#popup").show();
				}else{
					$("#popup").hide();
				}
			});
		}else{
			//show all markers
			allMarkers.forEach(function(marker){
				marker.setVisible(true);
			});
			//Remove items in array
			searchList.removeAll();
			$("#popup").hide();
		}
	});
}

//apply bindings
 var loadBindings = function(){
	 ko.applyBindings(ViewModel);
 };