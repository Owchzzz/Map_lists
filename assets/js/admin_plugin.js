var tc_admin = {};
var geocoder = new google.maps.Geocoder();

var map_markers = [];
var markers = [];
jQuery(function($){
	$(document).ready(function(){
		var input = document.getElementById('google-loc');
		var defaultbounds = new google.maps.LatLngBounds(
	new google.maps.LatLng(-90,-180),
	new google.maps.LatLng(90,180));
	
	var options = {
		bounds:defaultbounds
	};
		var autocomplete = new google.maps.places.Autocomplete(input,options);
		$('#google-loc').on('blur',function(){
			codeAddress();
		});
	});
	
	
});//End of jQuery

function codeAddress() {
    if(document.getElementById("google-loc") !== null)
	    {
	  //In this case it gets the address from an element on the page, but obviously you  could just pass it to the method instead
    var address = document.getElementById("google-loc").value;

    geocoder.geocode( { 'address': address}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
		// alert(results[0].geometry.location);
		 var country=getCountry(results[0].address_components);
		 personal_location = country;
		 
		 
		 var latitude = results[0].geometry.location.lat();
		 var longitude = results[0].geometry.location.lng();
        //In this case it creates a marker, but you can get the lat and lng from the location.LatLng
        //map.setCenter(results[0].geometry.location);
		 if(personal_location == 'US') {
			 
			 // Set lat and longitude
			 document.getElementById('google-loc-lat').value = latitude;
			 document.getElementById('google-loc-long').value = longitude;
			 
			 //Remove markers and add new marker
		 for(var i=0; i < markers.length; i++) {
			 markers[i].setMap(null);
		 }
           var marker =  new google.maps.Marker({
            map: map, 
            position: results[0].geometry.location
        	});
		 }
		 else {
			 alert('Only allowed for members from the United States');
			 document.getElementById('google-loc').value = "";
			 document.getElementById('google-loc').focus();
		 }
		 markers.push(marker);
      } else {
        //alert("Please enter a valid address");
      }
    });
	    }
}

function getCountry(addrComponents) {
    for (var i = 0; i < addrComponents.length; i++) {
        if (addrComponents[i].types[0] == "country") {
            return addrComponents[i].short_name;
        }
        if (addrComponents[i].types.length == 2) {
            if (addrComponents[i].types[0] == "political") {
                return addrComponents[i].short_name;
            }
        }
    }
    return false;
}


function initialize() {
	 var mapProp = {
    center:new google.maps.LatLng(39.9465097,-97.3788671),
 	zoom:4,
	minZoom:3,
	//zoomControl:false,
	 // scrollwheel:false,
	 // scaleControl:false,
	// draggable:false,
    disableDefaultUI: true,
    mapTypeId:google.maps.MapTypeId.ROADMAP
  };
 	 map=new google.maps.Map(document.getElementById("google-map-admin"),mapProp);
	 var strictBounds = new google.maps.LatLngBounds(
     new google.maps.LatLng(28.70, -127.50), 
     new google.maps.LatLng(48.85, -55.90)
   );
 
	
	//Set image bubble
	var image = {
		url: tc_resource_obj_ml.bubble_marker,
		origin: new google.maps.Point(0,0),
		
	};
	
	var image_xsmall = {
		url: tc_resource_obj_ml.bubble_marker_xsmall,
			origin:new google.maps.Point(0,0)
	};
	
	var image_small = {
			url: tc_resource_obj_ml.bubble_marker_small,
			origin: new google.maps.Point(0,0)
	};
	
	var image_medium = {
		url: tc_resource_obj_ml.bubble_marker_medium,
			origin:new google.maps.Point(0,0)
	};
	
	var image_lg = {
		url: tc_resource_obj_ml.bubble_marker_lg,
			origin: new google.maps.Point(0,0)
	};
	
	var sizeofmarker = 10;
	var imageMarker = new google.maps.MarkerImage(
	tc_resource_obj_ml.bubble_marker_lg,
	new google.maps.Size(sizeofmarker,sizeofmarker),
	null,
	null,
	new google.maps.Size(sizeofmarker,sizeofmarker))
	
	var markerScale = [null,image_xsmall,image_small,image_medium,image_lg];
	//Markers - Default
	/*var myLatLng = new google.maps.LatLng(39.9465097, -97.3788671);
  	var marker = new google.maps.Marker({
		 position: myLatLng,
		 map: map,
		 title: 'test',
		 icon: image
	  });
	

	var contentString = '<div id="content">'+
	    '<h5>Marker Header</h5><hr/>'+
	    '<ul style="display:block;margin:0px !important;list-style-type:none;"> <li>Richard Abear</li><li>Pittsburgh, Pennsylvania</li><br/><br/><li><b>Description:</b> Sibling</li></ul>'
     + '</div>';

  var infowindow = new google.maps.InfoWindow({
      content: contentString
  });
	
	google.maps.event.addListener(marker, 'click', function() {
    		infowindow.open(map, marker);
	}); */
	
	
	//New Marker Loop
	var arrayLength = tc_resource_obj_ml.map_data.length;
	
	//infowindow initialize
	var infowindow = new google.maps.InfoWindow({content:'loading...'});
	for(var i = 0 ; i < arrayLength; i++){
		var mapobj = tc_resource_obj_ml.map_data[i];
		var myLatLng = new google.maps.LatLng(mapobj['latitude'],mapobj['longitude']);
		var marker = new google.maps.Marker({
			position: myLatLng,
			map:map,
			title: mapobj['name'],
			icon:imageMarker,
			clickable:true,
			id:i
		});
		
		var contentString = '<div id="content">'+
	    '<ul style="display:block;margin:0px !important;list-style-type:none;"> ' +
		'<li>'+mapobj['name']+'</li>' +
		'<li>'+mapobj['location']+'</li>'+
		'<br/><li><b>Description:</b>' +mapobj['desc']+ '</li></ul>';
     + '</div>';
		marker.set('location',myLatLng);
		marker.set('content',contentString);
		
 		google.maps.event.addListener(marker, 'click', function() {
			var pos = this.get('location');
			var content = this.get('content');
			infowindow.setContent(content);
			infowindow.setPosition(pos);
			infowindow.open(this.getMap(),this);
		});
		map_markers[i] = marker;
	}
	
	google.maps.event.addListener(map, 'zoom_changed', function() {
		zoomLevel = map.getZoom();
		var maxPixelSize = 200;
		var minZoom = 2;
		
		var pixeltoRatio;
		
		pixeltoRatio = ((zoomLevel - minZoom) * 5);


		if(pixeltoRatio > maxPixelSize) pixeltoRatio = maxPixelSize; // cap size
		for(var i = 0; map_markers.length; i++) {
			map_markers[i].setIcon(
			new google.maps.MarkerImage(
			map_markers[i].getIcon().url,
				null,
				null,
				null,
				new google.maps.Size(pixeltoRatio,pixeltoRatio)
			));
		}
	});
	

	
}



google.maps.event.addDomListener(window, 'load', initialize);