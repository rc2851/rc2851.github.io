"use strict"

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

function getFoursquareData(){
	//AJAX call to get locations
	var jqxhr = $.get(url, function() {
		//console.log("ajax success");
	})
	.done(function(msg) {
		if (msg.response.venues.length > 0) {
			//iterate the response locations and load to an observablearray
			msg.response.venues.forEach(function(place){			
				if (place.location.state == "IL") {
					placeList.push(new Place(place));
				}
			}); 
		};
	})
	.fail(function() {
		$("#msg").text("A processing error has occurred. Please try again.");
		alert("A processing error has occurred. Please try again.");
	})
	.always(function() {
		//console.log("ajax done");
	});
}
 
//Display map
$("#mapDiv").append(googleMap);


//-----------------------------------------------------------------
//example below
/*
var metrolink = {
    "meta": {
        "code": 200,
        "requestId": "570aa11a498e4a72be43475b"
    },
    "response": {
        "venues": [{
            "id": "4ad8967ef964a520931221e3",
            "name": "MetroLink - 8th & Pine Station",
            "contact": {
                "twitter": "stlmetro"
            },
            "location": {
                "address": "8th street",
                "crossStreet": "Pine street",
                "lat": 38.627934951019576,
                "lng": -90.19268989562988,
                "postalCode": "63101",
                "mayNotNeedAddress": false,
                "cc": "US",
                "city": "St Louis",
                "state": "MO",
                "country": "United States",
                "formattedAddress": ["8th street (Pine street)", "St Louis, MO 63101", "United States"]
            },
            "categories": [{
                "id": "4bf58dd8d48988d1fc931735",
                "name": "Light Rail Station",
                "pluralName": "Light Rail Stations",
                "shortName": "Light Rail",
                "icon": {
                    "prefix": "https:\/\/ss3.4sqi.net\/img\/categories_v2\/travel\/lightrail_",
                    "suffix": ".png"
                },
                "primary": true
            }],
            "verified": false,
            "stats": {
                "checkinsCount": 3508,
                "usersCount": 580,
                "tipCount": 2
            },
            "url": "http:\/\/www.metrostlouis.org",
            "specials": {
                "count": 0,
                "items": []
            },
            "hereNow": {
                "count": 1,
                "summary": "One other person is here",
                "groups": [{
                    "type": "others",
                    "name": "Other people here",
                    "count": 1,
                    "items": []
                }]
            },
            "referralId": "v-1460314394",
            "venueChains": []
        }, {
            "id": "4aef6748f964a5202cd821e3",
            "name": "MetroLink - Convention Center Station",
            "contact": {
                "twitter": "stlmetro"
            },
            "location": {
                "address": "600 N. 6th St.",
                "crossStreet": "Washington",
                "lat": 38.6301887458746,
                "lng": -90.1894238682084,
                "postalCode": "63101",
                "mayNotNeedAddress": false,
                "cc": "US",
                "city": "St Louis",
                "state": "MO",
                "country": "United States",
                "formattedAddress": ["600 N. 6th St. (Washington)", "St Louis, MO 63101", "United States"]
            },
            "categories": [{
                "id": "4bf58dd8d48988d1fc931735",
                "name": "Light Rail Station",
                "pluralName": "Light Rail Stations",
                "shortName": "Light Rail",
                "icon": {
                    "prefix": "https:\/\/ss3.4sqi.net\/img\/categories_v2\/travel\/lightrail_",
                    "suffix": ".png"
                },
                "primary": true
            }],
            "verified": false,
            "stats": {
                "checkinsCount": 2535,
                "usersCount": 602,
                "tipCount": 4
            },
            "url": "http:\/\/www.metrostlouis.org",
            "specials": {
                "count": 0,
                "items": []
            },
            "hereNow": {
                "count": 0,
                "summary": "Nobody here",
                "groups": []
            },
            "referralId": "v-1460314394",
            "venueChains": []
        }, {
            "id": "4e19e55cd1648b8348402ee9",
            "name": "MetroLink - Union Station",
            "contact": {
                "twitter": "stlmetro"
            },
            "location": {
                "address": "305 S. 18th St.",
                "crossStreet": "at Clark St.",
                "lat": 38.62659389198804,
                "lng": -90.20659446716309,
                "postalCode": "63104",
                "mayNotNeedAddress": false,
                "cc": "US",
                "city": "St Louis",
                "state": "MO",
                "country": "United States",
                "formattedAddress": ["305 S. 18th St. (at Clark St.)", "St Louis, MO 63104", "United States"]
            },
            "categories": [{
                "id": "4bf58dd8d48988d1fc931735",
                "name": "Light Rail Station",
                "pluralName": "Light Rail Stations",
                "shortName": "Light Rail",
                "icon": {
                    "prefix": "https:\/\/ss3.4sqi.net\/img\/categories_v2\/travel\/lightrail_",
                    "suffix": ".png"
                },
                "primary": true
            }],
            "verified": false,
            "stats": {
                "checkinsCount": 4321,
                "usersCount": 1818,
                "tipCount": 7
            },
            "url": "http:\/\/www.metrostlouis.org",
            "specials": {
                "count": 0,
                "items": []
            },
            "hereNow": {
                "count": 0,
                "summary": "Nobody here",
                "groups": []
            },
            "referralId": "v-1460314394",
            "venueChains": []
        }, {
            "id": "4afcd391f964a520232622e3",
            "name": "MetroLink - Civic Center Station",
            "contact": {
                "twitter": "stlmetro"
            },
            "location": {
                "address": "1413 Spruce St.",
                "lat": 38.624682839531914,
                "lng": -90.20311832427979,
                "postalCode": "63103",
                "mayNotNeedAddress": false,
                "cc": "US",
                "city": "St Louis",
                "state": "MO",
                "country": "United States",
                "formattedAddress": ["1413 Spruce St.", "St Louis, MO 63103", "United States"]
            },
            "categories": [{
                "id": "4bf58dd8d48988d1fc931735",
                "name": "Light Rail Station",
                "pluralName": "Light Rail Stations",
                "shortName": "Light Rail",
                "icon": {
                    "prefix": "https:\/\/ss3.4sqi.net\/img\/categories_v2\/travel\/lightrail_",
                    "suffix": ".png"
                },
                "primary": true
            }],
            "verified": false,
            "stats": {
                "checkinsCount": 4508,
                "usersCount": 1576,
                "tipCount": 11
            },
            "url": "http:\/\/www.metrostlouis.org",
            "specials": {
                "count": 0,
                "items": []
            },
            "hereNow": {
                "count": 0,
                "summary": "Nobody here",
                "groups": []
            },
            "referralId": "v-1460314394",
            "venueChains": []
        }, {
            "id": "4ae1dc77f964a520108821e3",
            "name": "MetroLink - Stadium Station",
            "contact": {
                "twitter": "stlmetro"
            },
            "location": {
                "address": "400 S. 8th Street",
                "crossStreet": "btwn Clark Ave & Spruce St",
                "lat": 38.62357641746297,
                "lng": -90.19463181495667,
                "postalCode": "63102",
                "mayNotNeedAddress": false,
                "cc": "US",
                "city": "St Louis",
                "state": "MO",
                "country": "United States",
                "formattedAddress": ["400 S. 8th Street (btwn Clark Ave & Spruce St)", "St Louis, MO 63102", "United States"]
            },
            "categories": [{
                "id": "4bf58dd8d48988d1fc931735",
                "name": "Light Rail Station",
                "pluralName": "Light Rail Stations",
                "shortName": "Light Rail",
                "icon": {
                    "prefix": "https:\/\/ss3.4sqi.net\/img\/categories_v2\/travel\/lightrail_",
                    "suffix": ".png"
                },
                "primary": true
            }],
            "verified": false,
            "stats": {
                "checkinsCount": 3152,
                "usersCount": 1384,
                "tipCount": 3
            },
            "url": "http:\/\/www.metrostlouis.org",
            "specials": {
                "count": 0,
                "items": []
            },
            "hereNow": {
                "count": 0,
                "summary": "Nobody here",
                "groups": []
            },
            "referralId": "v-1460314394",
            "venueChains": []
        }, {
            "id": "4ae1db95f964a520088821e3",
            "name": "MetroLink - Arch-Laclede's Landing Station",
            "contact": {
                "twitter": "stlmetro"
            },
            "location": {
                "address": "200 East Washington Avenue",
                "lat": 38.629431040401926,
                "lng": -90.18404245376587,
                "postalCode": "63102",
                "mayNotNeedAddress": false,
                "cc": "US",
                "city": "St Louis",
                "state": "MO",
                "country": "United States",
                "formattedAddress": ["200 East Washington Avenue", "St Louis, MO 63102", "United States"]
            },
            "categories": [{
                "id": "4bf58dd8d48988d1fc931735",
                "name": "Light Rail Station",
                "pluralName": "Light Rail Stations",
                "shortName": "Light Rail",
                "icon": {
                    "prefix": "https:\/\/ss3.4sqi.net\/img\/categories_v2\/travel\/lightrail_",
                    "suffix": ".png"
                },
                "primary": true
            }],
            "verified": false,
            "stats": {
                "checkinsCount": 2799,
                "usersCount": 982,
                "tipCount": 2
            },
            "url": "http:\/\/www.metrostlouis.org",
            "specials": {
                "count": 0,
                "items": []
            },
            "hereNow": {
                "count": 0,
                "summary": "Nobody here",
                "groups": []
            },
            "referralId": "v-1460314394",
            "venueChains": []
        }, {
            "id": "4ae1f55af964a520288921e3",
            "name": "MetroLink - Central West End Station",
            "contact": {
                "twitter": "stlmetro"
            },
            "location": {
                "address": "Scott Ave at S Taylor Ave",
                "lat": 38.635679076246674,
                "lng": -90.26191234588623,
                "postalCode": "63110",
                "mayNotNeedAddress": false,
                "cc": "US",
                "city": "St Louis",
                "state": "MO",
                "country": "United States",
                "formattedAddress": ["Scott Ave at S Taylor Ave", "St Louis, MO 63110", "United States"]
            },
            "categories": [{
                "id": "4bf58dd8d48988d1fc931735",
                "name": "Light Rail Station",
                "pluralName": "Light Rail Stations",
                "shortName": "Light Rail",
                "icon": {
                    "prefix": "https:\/\/ss3.4sqi.net\/img\/categories_v2\/travel\/lightrail_",
                    "suffix": ".png"
                },
                "primary": true
            }],
            "verified": false,
            "stats": {
                "checkinsCount": 10027,
                "usersCount": 1288,
                "tipCount": 16
            },
            "url": "http:\/\/www.metrostlouis.org",
            "specials": {
                "count": 0,
                "items": []
            },
            "hereNow": {
                "count": 0,
                "summary": "Nobody here",
                "groups": []
            },
            "referralId": "v-1460314394",
            "venueChains": []
        }, {
            "id": "4c82e055e602b1f7b125a17a",
            "name": "MetroLink - East Riverfront Station",
            "contact": {
                "twitter": "stlmetro"
            },
            "location": {
                "address": "100 S Front St",
                "lat": 38.62808169161103,
                "lng": -90.17409294487518,
                "postalCode": "62201",
                "mayNotNeedAddress": false,
                "cc": "US",
                "city": "East Saint Louis",
                "state": "IL",
                "country": "United States",
                "formattedAddress": ["100 S Front St", "East Saint Louis, IL 62201", "United States"]
            },
            "categories": [{
                "id": "4bf58dd8d48988d1fc931735",
                "name": "Light Rail Station",
                "pluralName": "Light Rail Stations",
                "shortName": "Light Rail",
                "icon": {
                    "prefix": "https:\/\/ss3.4sqi.net\/img\/categories_v2\/travel\/lightrail_",
                    "suffix": ".png"
                },
                "primary": true
            }],
            "verified": false,
            "stats": {
                "checkinsCount": 2164,
                "usersCount": 603,
                "tipCount": 5
            },
            "url": "http:\/\/www.metrostlouis.org",
            "specials": {
                "count": 0,
                "items": []
            },
            "hereNow": {
                "count": 0,
                "summary": "Nobody here",
                "groups": []
            },
            "referralId": "v-1460314394",
            "venueChains": []
        }, {
            "id": "4b0bd188f964a520e23323e3",
            "name": "MetroLink - Shrewsbury-Lansdowne\/I-44 Station",
            "contact": {
                "twitter": "stlmetro"
            },
            "location": {
                "address": "7201 Lansdowne Ave",
                "crossStreet": "(UPPER LEVEL)",
                "lat": 38.59297750557368,
                "lng": -90.31939744949341,
                "postalCode": "63119",
                "mayNotNeedAddress": false,
                "cc": "US",
                "city": "St Louis",
                "state": "MO",
                "country": "United States",
                "formattedAddress": ["7201 Lansdowne Ave ((UPPER LEVEL))", "St Louis, MO 63119", "United States"]
            },
            "categories": [{
                "id": "4bf58dd8d48988d1fc931735",
                "name": "Light Rail Station",
                "pluralName": "Light Rail Stations",
                "shortName": "Light Rail",
                "icon": {
                    "prefix": "https:\/\/ss3.4sqi.net\/img\/categories_v2\/travel\/lightrail_",
                    "suffix": ".png"
                },
                "primary": true
            }],
            "verified": false,
            "stats": {
                "checkinsCount": 6488,
                "usersCount": 957,
                "tipCount": 16
            },
            "url": "http:\/\/www.metrostlouis.org",
            "specials": {
                "count": 0,
                "items": []
            },
            "hereNow": {
                "count": 0,
                "summary": "Nobody here",
                "groups": []
            },
            "referralId": "v-1460314394",
            "venueChains": []
        }, {
            "id": "4afdf181f964a520432c22e3",
            "name": "MetroLink - Grand Station",
            "contact": {
                "twitter": "stlmetro"
            },
            "location": {
                "address": "519-647 S Grand Blvd",
                "lat": 38.629510663331686,
                "lng": -90.23534774780273,
                "postalCode": "63103",
                "mayNotNeedAddress": false,
                "cc": "US",
                "city": "St Louis",
                "state": "MO",
                "country": "United States",
                "formattedAddress": ["519-647 S Grand Blvd", "St Louis, MO 63103", "United States"]
            },
            "categories": [{
                "id": "4bf58dd8d48988d1fc931735",
                "name": "Light Rail Station",
                "pluralName": "Light Rail Stations",
                "shortName": "Light Rail",
                "icon": {
                    "prefix": "https:\/\/ss3.4sqi.net\/img\/categories_v2\/travel\/lightrail_",
                    "suffix": ".png"
                },
                "primary": true
            }],
            "verified": false,
            "stats": {
                "checkinsCount": 2878,
                "usersCount": 861,
                "tipCount": 10
            },
            "url": "http:\/\/www.metrostlouis.org",
            "specials": {
                "count": 0,
                "items": []
            },
            "hereNow": {
                "count": 0,
                "summary": "Nobody here",
                "groups": []
            },
            "referralId": "v-1460314394",
            "venueChains": []
        }, {
            "id": "4ae1f4aff964a520208921e3",
            "name": "MetroLink - Forest Park Station",
            "contact": {
                "twitter": "stlmetro"
            },
            "location": {
                "address": "250 DeBaliviere Ave.",
                "crossStreet": "btwn Forest Park Parkway & DeBaliviere",
                "lat": 38.64767914125833,
                "lng": -90.284743309021,
                "postalCode": "63112",
                "mayNotNeedAddress": false,
                "cc": "US",
                "city": "St Louis",
                "state": "MO",
                "country": "United States",
                "formattedAddress": ["250 DeBaliviere Ave. (btwn Forest Park Parkway & DeBaliviere)", "St Louis, MO 63112", "United States"]
            },
            "categories": [{
                "id": "4bf58dd8d48988d1fc931735",
                "name": "Light Rail Station",
                "pluralName": "Light Rail Stations",
                "shortName": "Light Rail",
                "icon": {
                    "prefix": "https:\/\/ss3.4sqi.net\/img\/categories_v2\/travel\/lightrail_",
                    "suffix": ".png"
                },
                "primary": true
            }],
            "verified": false,
            "stats": {
                "checkinsCount": 7400,
                "usersCount": 1567,
                "tipCount": 13
            },
            "url": "http:\/\/www.metrostlouis.org",
            "specials": {
                "count": 0,
                "items": []
            },
            "hereNow": {
                "count": 0,
                "summary": "Nobody here",
                "groups": []
            },
            "referralId": "v-1460314394",
            "venueChains": []
        }, {
            "id": "4ae1dd50f964a5201d8821e3",
            "name": "MetroLink - Delmar Loop Station",
            "contact": {
                "twitter": "stlmetro"
            },
            "location": {
                "address": "660 Rosedale Ave.",
                "lat": 38.655521673220235,
                "lng": -90.29457092285156,
                "postalCode": "63112",
                "mayNotNeedAddress": false,
                "cc": "US",
                "city": "St Louis",
                "state": "MO",
                "country": "United States",
                "formattedAddress": ["660 Rosedale Ave.", "St Louis, MO 63112", "United States"]
            },
            "categories": [{
                "id": "4bf58dd8d48988d1fc931735",
                "name": "Light Rail Station",
                "pluralName": "Light Rail Stations",
                "shortName": "Light Rail",
                "icon": {
                    "prefix": "https:\/\/ss3.4sqi.net\/img\/categories_v2\/travel\/lightrail_",
                    "suffix": ".png"
                },
                "primary": true
            }],
            "verified": false,
            "stats": {
                "checkinsCount": 3863,
                "usersCount": 695,
                "tipCount": 9
            },
            "url": "http:\/\/www.metrostlouis.org",
            "specials": {
                "count": 0,
                "items": []
            },
            "hereNow": {
                "count": 0,
                "summary": "Nobody here",
                "groups": []
            },
            "referralId": "v-1460314394",
            "venueChains": []
        }, {
            "id": "4adb2e22f964a520b82421e3",
            "name": "MetroLink - North Hanley Station",
            "contact": {
                "twitter": "stlmetro"
            },
            "location": {
                "address": "4400 N Hanley Rd",
                "lat": 38.7198944830482,
                "lng": -90.31586101548542,
                "postalCode": "63121",
                "mayNotNeedAddress": false,
                "cc": "US",
                "city": "Berkeley",
                "state": "MO",
                "country": "United States",
                "formattedAddress": ["4400 N Hanley Rd", "Berkeley, MO 63121", "United States"]
            },
            "categories": [{
                "id": "4bf58dd8d48988d1fc931735",
                "name": "Light Rail Station",
                "pluralName": "Light Rail Stations",
                "shortName": "Light Rail",
                "icon": {
                    "prefix": "https:\/\/ss3.4sqi.net\/img\/categories_v2\/travel\/lightrail_",
                    "suffix": ".png"
                },
                "primary": true
            }],
            "verified": false,
            "stats": {
                "checkinsCount": 5906,
                "usersCount": 1322,
                "tipCount": 14
            },
            "url": "http:\/\/www.metrostlouis.org",
            "specials": {
                "count": 0,
                "items": []
            },
            "hereNow": {
                "count": 0,
                "summary": "Nobody here",
                "groups": []
            },
            "referralId": "v-1460314394",
            "venueChains": []
        }, {
            "id": "4dffb310d4c080823b62f716",
            "name": "MetroLink Yard and Shop",
            "contact": {},
            "location": {
                "address": "701 S Ewing Ave",
                "crossStreet": "Scott Ave",
                "lat": 38.6255880812546,
                "lng": -90.22058486938477,
                "postalCode": "63103",
                "mayNotNeedAddress": false,
                "cc": "US",
                "city": "St Louis",
                "state": "MO",
                "country": "United States",
                "formattedAddress": ["701 S Ewing Ave (Scott Ave)", "St Louis, MO 63103", "United States"]
            },
            "categories": [{
                "id": "4bf58dd8d48988d1fc931735",
                "name": "Light Rail Station",
                "pluralName": "Light Rail Stations",
                "shortName": "Light Rail",
                "icon": {
                    "prefix": "https:\/\/ss3.4sqi.net\/img\/categories_v2\/travel\/lightrail_",
                    "suffix": ".png"
                },
                "primary": true
            }],
            "verified": false,
            "stats": {
                "checkinsCount": 23,
                "usersCount": 15,
                "tipCount": 0
            },
            "specials": {
                "count": 0,
                "items": []
            },
            "hereNow": {
                "count": 0,
                "summary": "Nobody here",
                "groups": []
            },
            "referralId": "v-1460314394",
            "venueChains": []
        }, {
            "id": "4b7940b1f964a520dff02ee3",
            "name": "MetroLink - 5th & Missouri Station",
            "contact": {
                "twitter": "stlmetro"
            },
            "location": {
                "address": "150 N. 5th St.",
                "lat": 38.62502434541923,
                "lng": -90.15971457207918,
                "postalCode": "62201",
                "mayNotNeedAddress": false,
                "cc": "US",
                "city": "East Saint Louis",
                "state": "IL",
                "country": "United States",
                "formattedAddress": ["150 N. 5th St.", "East Saint Louis, IL 62201", "United States"]
            },
            "categories": [{
                "id": "4bf58dd8d48988d1fc931735",
                "name": "Light Rail Station",
                "pluralName": "Light Rail Stations",
                "shortName": "Light Rail",
                "icon": {
                    "prefix": "https:\/\/ss3.4sqi.net\/img\/categories_v2\/travel\/lightrail_",
                    "suffix": ".png"
                },
                "primary": true
            }],
            "verified": false,
            "stats": {
                "checkinsCount": 1493,
                "usersCount": 364,
                "tipCount": 4
            },
            "url": "http:\/\/www.metrostlouis.org",
            "specials": {
                "count": 0,
                "items": []
            },
            "hereNow": {
                "count": 0,
                "summary": "Nobody here",
                "groups": []
            },
            "referralId": "v-1460314394",
            "venueChains": []
        }, {
            "id": "4b89340df964a520ce2232e3",
            "name": "MetroLink - Fairview Heights Station",
            "contact": {
                "twitter": "stlmetro"
            },
            "location": {
                "address": "9200 St. Clair Ave.",
                "lat": 38.59366302717356,
                "lng": -90.04763603210449,
                "postalCode": "62208",
                "mayNotNeedAddress": false,
                "cc": "US",
                "city": "Fairview Heights",
                "state": "IL",
                "country": "United States",
                "formattedAddress": ["9200 St. Clair Ave.", "Fairview Heights, IL 62208", "United States"]
            },
            "categories": [{
                "id": "4bf58dd8d48988d1fc931735",
                "name": "Light Rail Station",
                "pluralName": "Light Rail Stations",
                "shortName": "Light Rail",
                "icon": {
                    "prefix": "https:\/\/ss3.4sqi.net\/img\/categories_v2\/travel\/lightrail_",
                    "suffix": ".png"
                },
                "primary": true
            }],
            "verified": false,
            "stats": {
                "checkinsCount": 3261,
                "usersCount": 676,
                "tipCount": 3
            },
            "url": "http:\/\/www.metrostlouis.org",
            "specials": {
                "count": 0,
                "items": []
            },
            "hereNow": {
                "count": 0,
                "summary": "Nobody here",
                "groups": []
            },
            "referralId": "v-1460314394",
            "venueChains": []
        }, {
            "id": "4bf71c125ec320a1006f86d3",
            "name": "MetroLink - Emerson Park Station",
            "contact": {
                "twitter": "stlmetro"
            },
            "location": {
                "address": "Baugh Avenue",
                "crossStreet": "I-64",
                "lat": 38.62889143333334,
                "lng": -90.13712268333333,
                "mayNotNeedAddress": false,
                "cc": "US",
                "city": "East Saint Louis",
                "state": "IL",
                "country": "United States",
                "formattedAddress": ["Baugh Avenue (I-64)", "East Saint Louis, IL", "United States"]
            },
            "categories": [{
                "id": "4bf58dd8d48988d1fc931735",
                "name": "Light Rail Station",
                "pluralName": "Light Rail Stations",
                "shortName": "Light Rail",
                "icon": {
                    "prefix": "https:\/\/ss3.4sqi.net\/img\/categories_v2\/travel\/lightrail_",
                    "suffix": ".png"
                },
                "primary": true
            }],
            "verified": false,
            "stats": {
                "checkinsCount": 1514,
                "usersCount": 288,
                "tipCount": 2
            },
            "url": "http:\/\/www.metrostlouis.org",
            "specials": {
                "count": 0,
                "items": []
            },
            "hereNow": {
                "count": 0,
                "summary": "Nobody here",
                "groups": []
            },
            "referralId": "v-1460314394",
            "venueChains": []
        }, {
            "id": "4ba284e6f964a5206d0038e3",
            "name": "MetroLink - Rock Road Station",
            "contact": {
                "twitter": "stlmetro"
            },
            "location": {
                "address": "7019 St. Charles Rock Road",
                "lat": 38.68581125239751,
                "lng": -90.30092239379883,
                "postalCode": "63133",
                "mayNotNeedAddress": false,
                "cc": "US",
                "city": "St Louis",
                "state": "MO",
                "country": "United States",
                "formattedAddress": ["7019 St. Charles Rock Road", "St Louis, MO 63133", "United States"]
            },
            "categories": [{
                "id": "4bf58dd8d48988d1fc931735",
                "name": "Light Rail Station",
                "pluralName": "Light Rail Stations",
                "shortName": "Light Rail",
                "icon": {
                    "prefix": "https:\/\/ss3.4sqi.net\/img\/categories_v2\/travel\/lightrail_",
                    "suffix": ".png"
                },
                "primary": true
            }],
            "verified": false,
            "stats": {
                "checkinsCount": 1242,
                "usersCount": 409,
                "tipCount": 3
            },
            "url": "http:\/\/www.metrostlouis.org",
            "specials": {
                "count": 0,
                "items": []
            },
            "hereNow": {
                "count": 1,
                "summary": "One other person is here",
                "groups": [{
                    "type": "others",
                    "name": "Other people here",
                    "count": 1,
                    "items": []
                }]
            },
            "referralId": "v-1460314394",
            "venueChains": []
        }, {
            "id": "4da623a91e722893cd1a4155",
            "name": "MetroLink - Clayton Station",
            "contact": {
                "twitter": "stlmetro"
            },
            "location": {
                "address": "7919-7999 Forest Park Pkwy",
                "lat": 38.645690977453725,
                "lng": -90.33970840373514,
                "postalCode": "63105",
                "mayNotNeedAddress": false,
                "cc": "US",
                "city": "Clayton",
                "state": "MO",
                "country": "United States",
                "formattedAddress": ["7919-7999 Forest Park Pkwy", "Clayton, MO 63105", "United States"]
            },
            "categories": [{
                "id": "4bf58dd8d48988d1fc931735",
                "name": "Light Rail Station",
                "pluralName": "Light Rail Stations",
                "shortName": "Light Rail",
                "icon": {
                    "prefix": "https:\/\/ss3.4sqi.net\/img\/categories_v2\/travel\/lightrail_",
                    "suffix": ".png"
                },
                "primary": true
            }],
            "verified": false,
            "stats": {
                "checkinsCount": 2043,
                "usersCount": 565,
                "tipCount": 6
            },
            "url": "http:\/\/www.metrostlouis.org",
            "specials": {
                "count": 0,
                "items": []
            },
            "hereNow": {
                "count": 0,
                "summary": "Nobody here",
                "groups": []
            },
            "referralId": "v-1460314394",
            "venueChains": []
        }, {
            "id": "4c2968cdce3fc92837cb6e88",
            "name": "MetroLink - Washington Park Station",
            "contact": {
                "twitter": "stlmetro"
            },
            "location": {
                "address": "955 N. Kingshighway",
                "lat": 38.613886113019824,
                "lng": -90.09522914886475,
                "postalCode": "62203",
                "mayNotNeedAddress": false,
                "cc": "US",
                "city": "East Saint Louis",
                "state": "IL",
                "country": "United States",
                "formattedAddress": ["955 N. Kingshighway", "East Saint Louis, IL 62203", "United States"]
            },
            "categories": [{
                "id": "4bf58dd8d48988d1fc931735",
                "name": "Light Rail Station",
                "pluralName": "Light Rail Stations",
                "shortName": "Light Rail",
                "icon": {
                    "prefix": "https:\/\/ss3.4sqi.net\/img\/categories_v2\/travel\/lightrail_",
                    "suffix": ".png"
                },
                "primary": true
            }],
            "verified": false,
            "stats": {
                "checkinsCount": 1004,
                "usersCount": 251,
                "tipCount": 2
            },
            "url": "http:\/\/www.metrostlouis.org",
            "specials": {
                "count": 0,
                "items": []
            },
            "hereNow": {
                "count": 0,
                "summary": "Nobody here",
                "groups": []
            },
            "referralId": "v-1460314394",
            "venueChains": []
        }, {
            "id": "4bf43a9398ac0f4774bf63a8",
            "name": "MetroLink - University City-Big Bend Station",
            "contact": {
                "twitter": "stlmetro"
            },
            "location": {
                "address": "7000 Forest Park Parkway",
                "lat": 38.6517010597658,
                "lng": -90.31491279602051,
                "postalCode": "63130",
                "mayNotNeedAddress": false,
                "cc": "US",
                "city": "St Louis",
                "state": "MO",
                "country": "United States",
                "formattedAddress": ["7000 Forest Park Parkway", "St Louis, MO 63130", "United States"]
            },
            "categories": [{
                "id": "4bf58dd8d48988d1fc931735",
                "name": "Light Rail Station",
                "pluralName": "Light Rail Stations",
                "shortName": "Light Rail",
                "icon": {
                    "prefix": "https:\/\/ss3.4sqi.net\/img\/categories_v2\/travel\/lightrail_",
                    "suffix": ".png"
                },
                "primary": true
            }],
            "verified": false,
            "stats": {
                "checkinsCount": 1643,
                "usersCount": 328,
                "tipCount": 3
            },
            "url": "http:\/\/www.metrostlouis.org",
            "specials": {
                "count": 0,
                "items": []
            },
            "hereNow": {
                "count": 0,
                "summary": "Nobody here",
                "groups": []
            },
            "referralId": "v-1460314394",
            "venueChains": []
        }, {
            "id": "4bab92aff964a52022b53ae3",
            "name": "MetroLink - Richmond Heights Station",
            "contact": {
                "twitter": "stlmetro"
            },
            "location": {
                "address": "8001 Galleria Parkway",
                "lat": 38.635712598779776,
                "lng": -90.34267902374268,
                "postalCode": "63144",
                "mayNotNeedAddress": false,
                "cc": "US",
                "city": "St Louis",
                "state": "MO",
                "country": "United States",
                "formattedAddress": ["8001 Galleria Parkway", "St Louis, MO 63144", "United States"]
            },
            "categories": [{
                "id": "4bf58dd8d48988d1fc931735",
                "name": "Light Rail Station",
                "pluralName": "Light Rail Stations",
                "shortName": "Light Rail",
                "icon": {
                    "prefix": "https:\/\/ss3.4sqi.net\/img\/categories_v2\/travel\/lightrail_",
                    "suffix": ".png"
                },
                "primary": true
            }],
            "verified": false,
            "stats": {
                "checkinsCount": 2187,
                "usersCount": 473,
                "tipCount": 1
            },
            "url": "http:\/\/www.metrostlouis.org",
            "specials": {
                "count": 0,
                "items": []
            },
            "hereNow": {
                "count": 0,
                "summary": "Nobody here",
                "groups": []
            },
            "referralId": "v-1460314394",
            "venueChains": []
        }, {
            "id": "4c615280cd522d7f192dd03f",
            "name": "MetroLink - Jackie Joyner-Kersee Station",
            "contact": {
                "twitter": "stlmetro"
            },
            "location": {
                "address": "1003 N. 25th St.",
                "lat": 38.62327466302691,
                "lng": -90.12462615966797,
                "postalCode": "62205",
                "mayNotNeedAddress": false,
                "cc": "US",
                "city": "East Saint Louis",
                "state": "IL",
                "country": "United States",
                "formattedAddress": ["1003 N. 25th St.", "East Saint Louis, IL 62205", "United States"]
            },
            "categories": [{
                "id": "4bf58dd8d48988d1fc931735",
                "name": "Light Rail Station",
                "pluralName": "Light Rail Stations",
                "shortName": "Light Rail",
                "icon": {
                    "prefix": "https:\/\/ss3.4sqi.net\/img\/categories_v2\/travel\/lightrail_",
                    "suffix": ".png"
                },
                "primary": true
            }],
            "verified": false,
            "stats": {
                "checkinsCount": 992,
                "usersCount": 257,
                "tipCount": 2
            },
            "url": "http:\/\/www.metrostlouis.org",
            "specials": {
                "count": 0,
                "items": []
            },
            "hereNow": {
                "count": 0,
                "summary": "Nobody here",
                "groups": []
            },
            "referralId": "v-1460314394",
            "venueChains": []
        }, {
            "id": "4bc90273b6c49c744bae8d91",
            "name": "MetroLink - Brentwood\/I-64 Station",
            "contact": {
                "twitter": "stlmetro"
            },
            "location": {
                "address": "8398 Eager Road",
                "lat": 38.627867898663666,
                "lng": -90.33817291259766,
                "postalCode": "63144",
                "mayNotNeedAddress": false,
                "cc": "US",
                "city": "Brentwood",
                "state": "MO",
                "country": "United States",
                "formattedAddress": ["8398 Eager Road", "Brentwood, MO 63144", "United States"]
            },
            "categories": [{
                "id": "4bf58dd8d48988d1fc931735",
                "name": "Light Rail Station",
                "pluralName": "Light Rail Stations",
                "shortName": "Light Rail",
                "icon": {
                    "prefix": "https:\/\/ss3.4sqi.net\/img\/categories_v2\/travel\/lightrail_",
                    "suffix": ".png"
                },
                "primary": true
            }],
            "verified": false,
            "stats": {
                "checkinsCount": 3346,
                "usersCount": 823,
                "tipCount": 4
            },
            "url": "http:\/\/www.metrostlouis.org",
            "specials": {
                "count": 0,
                "items": []
            },
            "hereNow": {
                "count": 0,
                "summary": "Nobody here",
                "groups": []
            },
            "referralId": "v-1460314394",
            "venueChains": []
        }, {
            "id": "505bdcc3e4b05434c01d76fb",
            "name": "BUS STOP: Grand MetroLink Station (SB)",
            "contact": {
                "phone": "3142312345",
                "formattedPhone": "(314) 231-2345",
                "twitter": "stlmetro"
            },
            "location": {
                "address": "647 S Grand Blvd",
                "crossStreet": "On the Grand Bridge",
                "lat": 38.6298942565918,
                "lng": -90.23544311523438,
                "postalCode": "63103",
                "mayNotNeedAddress": false,
                "cc": "US",
                "city": "St Louis",
                "state": "MO",
                "country": "United States",
                "formattedAddress": ["647 S Grand Blvd (On the Grand Bridge)", "St Louis, MO 63103", "United States"]
            },
            "categories": [{
                "id": "4bf58dd8d48988d12b951735",
                "name": "Bus Line",
                "pluralName": "Bus Lines",
                "shortName": "Bus",
                "icon": {
                    "prefix": "https:\/\/ss3.4sqi.net\/img\/categories_v2\/travel\/busstation_",
                    "suffix": ".png"
                },
                "primary": true
            }],
            "verified": false,
            "stats": {
                "checkinsCount": 84,
                "usersCount": 33,
                "tipCount": 0
            },
            "url": "http:\/\/www.metrostlouis.org",
            "specials": {
                "count": 0,
                "items": []
            },
            "hereNow": {
                "count": 0,
                "summary": "Nobody here",
                "groups": []
            },
            "referralId": "v-1460314394",
            "venueChains": []
        }, {
            "id": "4beb2fe8415e20a18d05e6bb",
            "name": "MetroLink - Maplewood-Manchester Station",
            "contact": {
                "phone": "3142312345",
                "formattedPhone": "(314) 231-2345",
                "twitter": "stlmetro"
            },
            "location": {
                "address": "2600 Bartold Ave",
                "crossStreet": "at Circle Dr",
                "lat": 38.6141208417473,
                "lng": -90.33143520355225,
                "postalCode": "63143",
                "mayNotNeedAddress": false,
                "cc": "US",
                "city": "Maplewood",
                "state": "MO",
                "country": "United States",
                "formattedAddress": ["2600 Bartold Ave (at Circle Dr)", "Maplewood, MO 63143", "United States"]
            },
            "categories": [{
                "id": "4bf58dd8d48988d1fc931735",
                "name": "Light Rail Station",
                "pluralName": "Light Rail Stations",
                "shortName": "Light Rail",
                "icon": {
                    "prefix": "https:\/\/ss3.4sqi.net\/img\/categories_v2\/travel\/lightrail_",
                    "suffix": ".png"
                },
                "primary": true
            }],
            "verified": false,
            "stats": {
                "checkinsCount": 1921,
                "usersCount": 370,
                "tipCount": 2
            },
            "url": "http:\/\/www.metrostlouis.org",
            "specials": {
                "count": 0,
                "items": []
            },
            "hereNow": {
                "count": 0,
                "summary": "Nobody here",
                "groups": []
            },
            "referralId": "v-1460314394",
            "venueChains": []
        }, {
            "id": "4b65e799f964a5205c072be3",
            "name": "MetroLink - Forsyth Station",
            "contact": {
                "twitter": "stlmetro"
            },
            "location": {
                "address": "7411 Forsyth Blvd.",
                "crossStreet": "forsyth",
                "lat": 38.648867,
                "lng": -90.32815601,
                "postalCode": "63130",
                "mayNotNeedAddress": false,
                "cc": "US",
                "city": "St Louis",
                "state": "MO",
                "country": "United States",
                "formattedAddress": ["7411 Forsyth Blvd. (forsyth)", "St Louis, MO 63130", "United States"]
            },
            "categories": [{
                "id": "4bf58dd8d48988d1fc931735",
                "name": "Light Rail Station",
                "pluralName": "Light Rail Stations",
                "shortName": "Light Rail",
                "icon": {
                    "prefix": "https:\/\/ss3.4sqi.net\/img\/categories_v2\/travel\/lightrail_",
                    "suffix": ".png"
                },
                "primary": true
            }],
            "verified": false,
            "stats": {
                "checkinsCount": 1527,
                "usersCount": 336,
                "tipCount": 2
            },
            "url": "http:\/\/www.metrostlouis.org",
            "specials": {
                "count": 0,
                "items": []
            },
            "hereNow": {
                "count": 0,
                "summary": "Nobody here",
                "groups": []
            },
            "referralId": "v-1460314394",
            "venueChains": []
        }, {
            "id": "4b033935f964a520ae4d22e3",
            "name": "MetroLink - UMSL North Station",
            "contact": {
                "twitter": "stlmetro"
            },
            "location": {
                "address": "8298 Bellerive Drive",
                "lat": 38.71283990545274,
                "lng": -90.30611515045166,
                "postalCode": "63121",
                "mayNotNeedAddress": false,
                "cc": "US",
                "city": "St Louis",
                "state": "MO",
                "country": "United States",
                "formattedAddress": ["8298 Bellerive Drive", "St Louis, MO 63121", "United States"]
            },
            "categories": [{
                "id": "4bf58dd8d48988d1fc931735",
                "name": "Light Rail Station",
                "pluralName": "Light Rail Stations",
                "shortName": "Light Rail",
                "icon": {
                    "prefix": "https:\/\/ss3.4sqi.net\/img\/categories_v2\/travel\/lightrail_",
                    "suffix": ".png"
                },
                "primary": true
            }],
            "verified": false,
            "stats": {
                "checkinsCount": 2360,
                "usersCount": 464,
                "tipCount": 5
            },
            "url": "http:\/\/www.metrostlouis.org",
            "specials": {
                "count": 0,
                "items": []
            },
            "hereNow": {
                "count": 0,
                "summary": "Nobody here",
                "groups": []
            },
            "referralId": "v-1460314394",
            "venueChains": []
        }, {
            "id": "4c3f7376ff711b8db5ef0e05",
            "name": "MetroLink - Wellston Station",
            "contact": {
                "twitter": "stlmetro"
            },
            "location": {
                "address": "6400 Plymouth Ave",
                "lat": 38.6686982011436,
                "lng": -90.29838767041808,
                "postalCode": "63133",
                "mayNotNeedAddress": false,
                "cc": "US",
                "city": "St Louis",
                "state": "MO",
                "country": "United States",
                "formattedAddress": ["6400 Plymouth Ave", "St Louis, MO 63133", "United States"]
            },
            "categories": [{
                "id": "4bf58dd8d48988d1fc931735",
                "name": "Light Rail Station",
                "pluralName": "Light Rail Stations",
                "shortName": "Light Rail",
                "icon": {
                    "prefix": "https:\/\/ss3.4sqi.net\/img\/categories_v2\/travel\/lightrail_",
                    "suffix": ".png"
                },
                "primary": true
            }],
            "verified": false,
            "stats": {
                "checkinsCount": 1030,
                "usersCount": 439,
                "tipCount": 4
            },
            "url": "http:\/\/www.metrostlouis.org",
            "specials": {
                "count": 0,
                "items": []
            },
            "hereNow": {
                "count": 0,
                "summary": "Nobody here",
                "groups": []
            },
            "referralId": "v-1460314394",
            "venueChains": []
        }, {
            "id": "4b79d0a0f964a520e5132fe3",
            "name": "MetroLink - Belleville Station",
            "contact": {
                "twitter": "stlmetro"
            },
            "location": {
                "address": "718 Scheel St",
                "lat": 38.521712577891975,
                "lng": -89.97461557388306,
                "postalCode": "62220",
                "mayNotNeedAddress": false,
                "cc": "US",
                "city": "Belleville",
                "state": "IL",
                "country": "United States",
                "formattedAddress": ["718 Scheel St", "Belleville, IL 62220", "United States"]
            },
            "categories": [{
                "id": "4bf58dd8d48988d1fc931735",
                "name": "Light Rail Station",
                "pluralName": "Light Rail Stations",
                "shortName": "Light Rail",
                "icon": {
                    "prefix": "https:\/\/ss3.4sqi.net\/img\/categories_v2\/travel\/lightrail_",
                    "suffix": ".png"
                },
                "primary": true
            }],
            "verified": false,
            "stats": {
                "checkinsCount": 1715,
                "usersCount": 214,
                "tipCount": 4
            },
            "url": "http:\/\/www.metrostlouis.org",
            "specials": {
                "count": 0,
                "items": []
            },
            "hereNow": {
                "count": 0,
                "summary": "Nobody here",
                "groups": []
            },
            "referralId": "v-1460314394",
            "venueChains": []
        }],
        "geocode": {
            "what": "",
            "where": "st louis mo",
            "feature": {
                "cc": "US",
                "name": "St Louis",
                "displayName": "St Louis, MO, United States",
                "matchedName": "St Louis, MO, United States",
                "highlightedName": "<b>St Louis<\/b>, <b>MO<\/b>, United States",
                "woeType": 7,
                "slug": "saint-louis-missouri",
                "id": "geonameid:4407066",
                "longId": "72057594042335002",
                "geometry": {
                    "center": {
                        "lat": 38.62727,
                        "lng": -90.19789
                    },
                    "bounds": {
                        "ne": {
                            "lat": 38.774431,
                            "lng": -90.166409
                        },
                        "sw": {
                            "lat": 38.531852,
                            "lng": -90.320515
                        }
                    }
                }
            },
            "parents": []
        }
    }
}
*/