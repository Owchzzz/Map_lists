var geocoder = new google.maps.Geocoder();
var markers = [];

function codeAddress() {
	  //In this case it gets the address from an element on the page, but obviously you  could just pass it to the method instead
    var address = document.getElementById("google-loc").value;

    geocoder.geocode( { 'address': address}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
		// alert(results[0].geometry.location);
		 var country=getCountry(results[0].address_components);
		 
        //In this case it creates a marker, but you can get the lat and lng from the location.LatLng
        //map.setCenter(results[0].geometry.location);
		 for(var i=0; i < markers.length; i++) {
			 markers[i].setMap(null);
		 }
           var marker =  new google.maps.Marker({
            map: map, 
            position: results[0].geometry.location
        });
		 markers.push(marker);
      } else {
        alert("Please enter a valid address");
      }
    });
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

jQuery(function ($) {
		

		
	// Load dialog on page load
	//$('#basic-modal-content').modal();

	// Load dialog on click
	$('.new-content-btn').click(function (e) {
		$('#simplemodal-modal').modal({
			onShow : function() {
				var input = document.getElementById('google-loc');
	
	var defaultbounds = new google.maps.LatLngBounds(
	new google.maps.LatLng(-90,-180),
	new google.maps.LatLng(90,180));
	
	var options = {
		bounds:defaultbounds
	};
	var autocomplete = new google.maps.places.Autocomplete(input,options);
			},
			
			onClose : function() {
				$('#google-loc').unbind();
				$('#google-loc').bind('blur',codeAddress());
				$('.pac-container').remove();
				$.modal.close();
			}
			
		});

		return false;
	});
		
	//Change values when input changed
	$('#google-loc').on('blur',function(){
		codeAddress();
	});
});
var map;

 
function initialize() {
	 var mapProp = {
    center:new google.maps.LatLng(39.9465097,-97.3788671),
    zoom:4,
	zoomControl:false,
	  scrollwheel:false,
	  scaleControl:false,
	  draggable:false,
    disableDefaultUI: true,
    mapTypeId:google.maps.MapTypeId.ROADMAP
  };
 	 map=new google.maps.Map(document.getElementById("googleMap"),mapProp);
	 var strictBounds = new google.maps.LatLngBounds(
     new google.maps.LatLng(28.70, -127.50), 
     new google.maps.LatLng(48.85, -55.90)
   );
 
	
	//Markers
	var image = {
		url: tc_resource_obj_ml.bubble_marker,
		 size: new google.maps.Size(20, 20),
		origin: new google.maps.Point(0,0),
		
	};
	var myLatLng = new google.maps.LatLng(39.9465097, -97.3788671);
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
	}); 
	
	
	
}
google.maps.event.addDomListener(window, 'load', initialize);
