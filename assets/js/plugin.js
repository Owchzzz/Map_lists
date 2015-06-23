var geocoder = new google.maps.Geocoder();
var markers = [];
var locklist = true;

var personal_location;
var bounds = new google.maps.LatLngBounds();

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
			 set_add_form(results[0].address_components);
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


function set_add_form(addrComponents) {
	 for (var i = 0; i < addrComponents.length; i++) {
		 console.log('initializing component search on type: ' + addrComponents[i].types);
        var addComp2 = addrComponents[i].types;
		 for(var k = 0; k < addComp2.length; k++) {
			 console.log('searhing... ' + addComp2[k]);
			 if(addComp2[k] == 'locality') { // City
				 document.getElementById('city').value = addrComponents[i].long_name;
				 console.log('FOUND CITY');
			 }
			 if(addComp2[k] == 'country' || addComp2[k] == 'political') {
				 document.getElementById('country').value = personal_location;
				 console.log('FOUND COUNTRY');
			 }
			 if(addComp2[k] == 'administrative_area_level_1') { // State
				 document.getElementById('state').value = addrComponents[i].long_name;
				 console.log('FOUND STATE');
			 }
			 if(addComp2[k] == 'postal_code') {
				 document.getElementById('zipcode').value= addrComponents[i].short_name;
				 console.log('FOUND ZIP');
			 }
		 }
		
	 }
	if(document.getElementById('zipcode').value == '') {
		document.getElementById('zipcode').value = 'INSERT ZIP';
	}
    return false;
}

var tcFormData;
var tcFormSuccess=false;
jQuery(function ($) {
	
	//append to body
	$(document).ready(function(){
		if($('#googleMapContainer').length)
		$('<!--Widgets (sidebars-hidden) --><div class="tc-sidebar-nav" id="maplist"><h4 style="float:left;">List</h4><i style="cursor:pointer;float:right;" class="tc-sidebar-nav-close icon ion-close"></i><ul class="maplistlist" id="tc-ul-maplist"></ul></div>').prependTo('body');
		
		$('.tc-sidebar-nav-close').click(function(){
		if($('#googleMapContainer').length) {
				var checker = parseInt($('#maplist').css('right'));
				if(checker < 0){
					//Do nothing
				}
				else {
					$('.tc-open-sidebar').trigger('click');
				}
			}
	});
		
	
	});
	
	// Load dialog on page load
	//$('#basic-modal-content').modal();

	// Load dialog on click
	$('.new-content-btn').click(function (e) {
		$('#simplemodal-modal').modal({
			onShow : function() {
				$('.simplemodal-container').css('z-index','1032');
				if(typeof tcFormData !== 'undefined' && tcFormData != '' && tcFormData !== 'undefined') {
					$('#tc_google_map_submit :input').each(function(){
						var obj = $(this);
						
						for(var i=0; i < tcFormData.length; i++) {
							if($(obj).attr('name') == tcFormData[i]['name']) {
								$(obj).attr('value',tcFormData[i]['value']);
							}
						}
					});
				}
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
				tcFormData = $('#tc_google_map_submit').serializeArray();
				$.modal.close();
				
				if(tcFormSuccess == true ){
					location.reload();
				}
			}
			
		});

		return false;
	});
		
	//Change values when input changed
	$('#google-loc').on('blur',function(){
		codeAddress();
	});
	
	
	//AJAX FUNCTIONALITY
	$('#tc_google_map_submit').on('submit',function(e){
		e.preventDefault();
		var validsubmit = false;
		var isValidZip = /(^\d{5}$)|(^\d{5}-\d{4}$)/.test($('#zipcode').val());
			if(isValidZip) {
				validsubmit = true;
			}
			else {
				alert('Invalid Zip code. Please enter a vlid US ZIP CODE.');
				$('#zipcode').focus();
			}
		if(validsubmit){
			var postData = $(this).serializeArray();
			$.post(tc_resource_obj_ml.ajax_url,
				 {'action' : 'submit_map_data', postData},
				 function(response){
					$('#simplemodal-modal').html(response);
					$('#simplemodal-modal').css('margin-top','250px;');
					tcFormSuccess = true;
				});
		}
			
	});
	
	
	//Modal extended functionality
	window.closebtn = function() {
		$( ".simplemodal-close" ).trigger( "click" );
	};
	
	
	
	$('.tc-open-sidebar').on('click',function(e){
		e.preventDefault();
		var targetID = $(this).attr('data-target');
		if(targetID !== '' && locklist == false) {
			var mtarg = '#'+targetID;
			var mtargwidth = $(mtarg).css('width');
			if(parseInt($(mtarg).css('right')) < 0) {
				$(mtarg).animate({right:'+='+mtargwidth},500,function(){
					
				});
			}
			else {
				$(mtarg).animate({right:'-='+mtargwidth},500,function(){
			
				});
			}
				
		}
	});
	
	
	window.loadmapslist = function() {
		for(var i=0; i<tc_resource_obj_ml.map_data.length; i++) {
			var mapdata = tc_resource_obj_ml.map_data;
			var list_count = i+1;
			$('ul#tc-ul-maplist').append(
			$('<li onclick="triggermapclick('+i+')">'+list_count+'<b>'+mapdata[i]['name']+'</b>,<bdi style="font-size:10px;">'+mapdata[i]['location']+'</bdi></li>')
			);
		}
		locklist=false;
	}
	
	
	window.triggermapclick = function(targ) {
		new google.maps.event.trigger( map_markers[targ], 'click');
		map.setCenter(map_markers[targ].position);
	}
	
	$(document).keydown(function(e){
		if(e.keyCode == 27){
			if($('#googleMapContainer').length) {
				var checker = parseInt($('#maplist').css('right'));
				if(checker < 0){
					//Do nothing
				}
				else {
					$('.tc-open-sidebar').trigger('click');
				}
			}
		}
			
	});
	
	
	
	
	
});
var map;
var map_markers = [];
var zoomLevel = 4;
 
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
 	 map=new google.maps.Map(document.getElementById("googleMap"),mapProp);
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
	
	var sizeofmarker = 20;
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
			
			map.panTo(this.position);
			
		});
		map_markers[i] = marker;
	}
	
	google.maps.event.addListener(map, 'zoom_changed', function() {
		zoomLevel = map.getZoom();
		var maxPixelSize = 450;
		var minZoom = 2;
		
		var pixeltoRatio;
		
		pixeltoRatio = ((zoomLevel - minZoom) * 10);


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
	
	loadmapslist();
	
}



google.maps.event.addDomListener(window, 'load', initialize);
	