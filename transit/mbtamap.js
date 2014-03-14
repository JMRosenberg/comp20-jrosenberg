var xhr;
mylat = 42.4137513;
mylng = -71.1137399;
myloc = new google.maps.LatLng(mylat, mylng);

function init()
{
    // Set Up Geolocation
    if(navigator.geolocation) {
	navigator.geolocation.getCurrentPosition(function(position) {
	    mylat = position.coords.latitude;
	    mylng = position.coords.longitude;
	    showMe();
	});
    }
    else {
	alert("Geolocation not supported");
    }
    
    // Faneuil Hall
    var startpoint = new google.maps.LatLng(42.3599611, -71.0567528);
    
    // Set up map
    var myOptions = {
	zoom: 12, // The larger the zoom number, the bigger the zoom
	center: startpoint,
	mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    
    // Create the map in the "map_canvas" <div>
    map = new google.maps.Map(document.getElementById("mbtaMap"), myOptions);
    
    // Get data from Rodeo
    xhr = new XMLHttpRequest();
    xhr.open("get", "http://mbtamap.herokuapp.com/mapper/rodeo.json", true);
    xhr.onreadystatechange = displayAll;
    xhr.send(null);
}

function displayAll()
{
    if(xhr.readyState != 4){
	return;
    }
    if(xhr.status == 500){
	alert("Error from Rodeo");
	return;
    }
    
    var myLine;
    var scheduleData = JSON.parse(xhr.responseText);

    if(scheduleData.line == "orange"){
	myLine = orangeLine;
	myColor = '#FF8800';
    }
    else if(scheduleData.line == "blue"){
	myLine = blueLine;
	myColor = '#0000FF';
    }
    else{
	myLine = redLine;
	myColor = '#FF0000';
    }
    
    // Create markers
    var image = 'train.png';
    var markers = [];
    var lineStops = [];
    for(tstop in myLine){
	marker = new google.maps.Marker({
	    position: new google.maps.LatLng(myLine[tstop].lat, myLine[tstop].lng),
	    title: "<h3>" + myLine[tstop].station + "</h3>",
	    icon: image
	});
	marker.setMap(map);
	markers.push(marker);
	lineStops[tstop] = new google.maps.LatLng(myLine[tstop].lat, myLine[tstop].lng);
    }
    var flightPath = new google.maps.Polyline({
	path: lineStops,
	geodesic: true,
	strokeColor: myColor,
	strokeOpacity: 1.0,
	strokeWeight: 2
    });
    flightPath.setMap(map);
    
    var infowindows = [];
    for(eachstop in markers){
	var contentstring = "<h3>" + myLine[eachstop].station + "</h3>" + 
	    "<table><tr><th>Train</th><th>Destination</th><th>Time</th>" + 
	    "</tr>";
	for(eachtrain in scheduleData.schedule){
	    for(preds in scheduleData.schedule[eachtrain].Predictions){
		if(scheduleData.schedule[eachtrain].Predictions[preds].Stop
		   == myLine[eachstop].station){
		    contentstring += "<tr><td>" + 
			scheduleData.schedule[eachtrain].TripID + "</td><td>" +
			scheduleData.schedule[eachtrain].Destination + 
			"</td><td>" + 
			scheduleData.schedule[eachtrain].Predictions[preds].Seconds
			+ "</td></tr>";
		}
	    }
	}
	contentstring += "</table>";
	
	infowindows[eachstop] = new google.maps.InfoWindow({
	    content: contentstring
	});
	infoListen(markers[eachstop], infowindows[eachstop]);
    }
/*
    mylat = 42.4137513;
    mylng = -71.1137399;
    myloc = new google.maps.LatLng(mylat, mylng);
*/
/*    // Geolocation
    if(navigator.geolocation) {
	console.log("YES");
	navigator.geolocation.getCurrentPosition(function(position) {
	    console.log("Next");
	    mylat = position.coords.latitude;
	    mylng = position.coords.longitude;
	    showMe();
	});
    }
    else {
	alert("Geolocation not supported");
    }
*/
    /*** TEMPORARY ***/
    memarker = new google.maps.Marker({
	position: new google.maps.LatLng(mylat, mylng),
	title: "'Sup?"
    });
    memarker.setMap(map);

    // Display closest stop
    closestDist = 999999999;
    closestInd = -1;
    for(stats in myLine){
	var R = 6371;
	var x1 = mylat - myLine[stats].lat;
	var dLat = x1.toRad();
	var x2 = mylng - myLine[stats].lng;
	var dLng = x2.toRad();
	var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
	    Math.cos(mylat.toRad()) * Math.cos(myLine[stats].lat.toRad()) *
	    Math.sin(dLng/2) * Math.sin(dLng/2);
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
	var d = R * c;
	if(d < closestDist){
	    closestDist = d;
	    closestInd = stats;
	}
    }
    // Draw a line
    var endPts = [myloc, new google.maps.LatLng(myLine[closestInd].lat, myLine[closestInd].lng)];
    var closePath = new google.maps.Polyline({
	path: endPts,
	geodesic: true,
	strokeColor: '#000000',
	strokeOpacity: 1.0,
	strokeWeight: 2
    });
    closePath.setMap(map);
    // Make InfoWindow with distance
    distwindow = new google.maps.InfoWindow({
	content: "<p>Closest Station: " + myLine[closestInd].station + 
	    "</p><p>Distance: " + closestDist + " miles </p>"
    });
    distwindow.open(memarker.get('map'), memarker);
    
}

// For Geolocation
function showMe() {
    me = new google.maps.LatLng(mylat, mylng);
    map.panTo(me);
    memarker = new google.maps.Marker({
	position: me,
	title: "Hello!"
    });
    memarker.setMap(map);
}

// To open infowindows onClick
function infoListen(marker, infowin) {
    google.maps.event.addListener(marker, 'click', function(){
	infowin.open(marker.get('map'), marker);
    });
}

Number.prototype.toRad = function() {
    return this * Math.PI / 180;
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
blueLine = [{"station": "Wonderland", "lat": 42.41342, "lng": -70.9916},
	    {"station": "Revere Beach", "lat": 42.40784, "lng": -70.9925},
	    {"station": "Beachmont", "lat": 42.39754, "lng": -70.9923},
	    {"station": "Suffolk Downs", "lat": 42.3905, "lng": -70.9971},
	    {"station": "Orient Heights", "lat": 42.38687, "lng": -71.0047},
	    {"station": "Wood Island", "lat": 42.37964, "lng": -71.0229},
	    {"station": "Airport", "lat": 42.37426, "lng": -71.0304},
	    {"station": "Maverick", "lat": 42.36912, "lng": -71.0395},
	    {"station": "Aquarium", "lat": 42.35978, "lng": -71.0517},
	    {"station": "State Street", "lat": 42.35898, "lng": -71.0576},
	    {"station": "Government Center", "lat": 42.35971, "lng": -71.0592},
	    {"station": "Bowdoin", "lat": 42.36137, "lng": -71.062}
	   ];
orangeLine = [{"station": "Oak Grove", "lat": 42.43668, "lng": -71.0711},
	      {"station": "Malden Center", "lat": 42.42663, "lng": -71.0741},
	      {"station": "Wellington", "lat": 42.40237, "lng": -71.0771},
	      {"station": "Sullivan", "lat": 42.38398, "lng": -71.077},
	      {"station": "Community College", "lat": 42.37362, "lng": -71.0695},
	      {"station": "North Station", "lat": 42.36558, "lng": -71.0613},
	      {"station": "Haymarket", "lat": 42.36302, "lng": -71.0583},
	      {"station": "State Street", "lat": 42.35898, "lng": -71.0576},
	      {"station": "Downtown Crossing", "lat": 42.35552, "lng": -71.0602},
	      {"station": "Chinatown", "lat": 42.35255, "lng": -71.0628},
	      {"station": "Tufts Medical", "lat": 42.34966, "lng": -71.0639},
	      {"station": "Back Bay", "lat": 42.34735, "lng": -71.0757},
	      {"station": "Mass Ave", "lat": 42.34151, "lng": -71.0834},
	      {"station": "Ruggles", "lat": 42.33638, "lng": -71.089},
	      {"station": "Roxbury Crossing", "lat": 42.3314, "lng": -71.0955},
	      {"station": "Jackson Square", "lat": 42.32313, "lng": -71.0996},
	      {"station": "Stony Brook", "lat": 42.31706, "lng": -71.1042},
	      {"station": "Green Street", "lat": 42.31053, "lng": -71.1074},
	      {"station": "Forest Hills", "lat": 42.30052, "lng": -71.1137}
	     ];