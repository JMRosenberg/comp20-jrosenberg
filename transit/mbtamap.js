function init()
{
    // Faneuil Hall
    var landmark = new google.maps.LatLng(42.3599611, -71.0567528);
    
    // Set up map
    var myOptions = {
	zoom: 12, // The larger the zoom number, the bigger the zoom
	center: landmark,
	mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    
    // Create the map in the "map_canvas" <div>
    var map = new google.maps.Map(document.getElementById("mbtaMap"), myOptions);
    
    // Create a marker
    var marker = [];
    var lineStops = [];
    for(tstop in redLine){
	marker[tstop] = new google.maps.Marker({
	    position: new google.maps.LatLng(redLine[tstop].lat, redLine[tstop].lng),
	    title: "<h3>" + redLine[tstop].station + "</h3>"
	});
	google.maps.event.addListener(marker[tstop], 'click', function(){
	    infowindow.setContent(marker[tstop].title);
	    infowindow.open(map, marker[tstop]);
	});
	marker[tstop].setMap(map);
	lineStops[tstop] = new google.maps.LatLng(redLine[tstop].lat, redLine[tstop].lng);
    }
    var flightPath = new google.maps.Polyline({
	path: lineStops,
	geodesic: true,
	strokeColor: '#FF0000',
	strokeOpacity: 1.0,
	strokeWeight: 2
    });
    flightPath.setMap(map);
    
    // This is a global info window...
    var infowindow = new google.maps.InfoWindow();
    
    // Open info window on click of marker
    /*google.maps.event.addListener(marker, 'click', function() {
	infowindow.setContent(marker.title);
	infowindow.open(map, marker);
    });*/
}

// Arrays with all the stations
redLine = [{"station": "Alewife", "lat": 42.395428, "lng": -71.142483},
	   {"station": "Davis", "lat": 42.39674, "lng": -71.1218},
	   {"station": "Porter", "lat": 42.3884, "lng": -71.1191},
	   {"station": "Harvard Square", "lat": 42.37336, "lng": -71.119},
	   {"station": "Central Square", "lat": 42.36549, "lng": -71.1038},
	   {"station": "Kendall/MIT", "lat": 42.36249, "lng": -71.0862},
	   {"station": "Charles/MGH", "lat": 42.36117, "lng": -71.0706},
	   {"station": "Park Street", "lat": 42.35639, "lng": -71.0624},
	   {"station": "Downtown Crossing", "lat": 42.35552, "lng": -71.0602},
	   {"station": "South Station", "lat": 42.35227, "lng": -71.0552},
	   {"station": "Broadway", "lat": 42.34262, "lng": -71.057},
	   {"station": "Andrew", "lat": 42.33015, "lng": -71.0577},
	   {"station": "JFK/UMass", "lat": 42.32069, "lng": -71.0524},
	   {"station": "Savin Hill", "lat": 42.31129, "lng": -71.0533},
	   {"station": "Fields Corner", "lat": 42.30009, "lng": -71.0617},
	   {"station": "Shawmut", "lat": 42.29313, "lng": -71.0657},
	   {"station": "Ashmont", "lat": 42.28465, "lng": -71.0645}
	  ];
blueLine = [{"station": "Wonderland", "lat": 0 , "lng": 0},
	    {"station": "Revere Beach", "lat": 0 , "lng": 0},
	    {"station": "Beachmont", "lat": 0 , "lng": 0},
	    {"station": "Suffolk Downs", "lat": 0 , "lng": 0},
	    {"station": "Orient Heights", "lat": 0 , "lng": 0},
	    {"station": "Wood Island", "lat": 0 , "lng": 0},
	    {"station": "Airport", "lat": 0 , "lng": 0},
	    {"station": "Maverick", "lat": 0 , "lng": 0},
	    {"station": "Aquarium", "lat": 0 , "lng": 0},
	    {"station": "State Street", "lat": 0 , "lng": 0},
	    {"station": "Government Center", "lat": 0 , "lng": 0},
	    {"station": "Bowdoin", "lat": 0 , "lng": 0}
	   ];
orangeLine = [{"station": "Oak Grove", "lat": 0 , "lng": 0},
	      {"station": "Malden Center", "lat": 0 , "lng": 0},
	      {"station": "Wellington", "lat": 0 , "lng": 0},
	      {"station": "Sullivan Square", "lat": 0 , "lng": 0},
	      {"station": "Community College", "lat": 0 , "lng": 0},
	      {"station": "North Station", "lat": 0 , "lng": 0},
	      {"station": "Haymarket", "lat": 0 , "lng": 0},
	      {"station": "State Street", "lat": 0 , "lng": 0},
	      {"station": "Downtown Crossing", "lat": 0 , "lng": 0},
	      {"station": "Chinatown", "lat": 0 , "lng": 0},
	      {"station": "Tufts Medical", "lat": 0 , "lng": 0},
	      {"station": "Back Bay", "lat": 0 , "lng": 0},
	      {"station": "Mass Ave", "lat": 0 , "lng": 0},
	      {"station": "Ruggles", "lat": 0 , "lng": 0},
	      {"station": "Roxbury Crossing", "lat": 0 , "lng": 0},
	      {"station": "Jackson Square", "lat": 0 , "lng": 0},
	      {"station": "Stony Brook", "lat": 0 , "lng": 0},
	      {"station": "Green Street", "lat": 0 , "lng": 0},
	      {"station": "Forest Hills", "lat": 0 , "lng": 0}
	     ];