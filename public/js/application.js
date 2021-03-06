
$(document).ready(function() {
	var poly = new Polygon();
  var map = new GMaps({
    el: '#map',
    lat: 0,
    lng: 0,
    zoomControl : true,
    zoomControlOpt: {
        style : 'SMALL',
        position: 'TOP_LEFT'
    },
    panControl : false,
    streetViewControl : false,
    mapTypeControl: false,
    overviewMapControl: false
  });

  GMaps.geolocate({
	  success: function(position){
	    map.setCenter(position.coords.latitude, position.coords.longitude);
	  },
	  error: function(error){
	    alert('Geolocation failed: '+error.message);
	  },
	  not_supported: function(){
	    alert("Your browser does not support geolocation");
	  }
  });

  map.on('click', function(e) {
  	var lat = e.latLng.lat(), lng = e.latLng.lng();
  	poly.newCoord(new Coord(lat, lng));
  	map.addMarker({
			lat: lat,
  		lng: lng
  	});
  	if (poly.hasPair()) {
  		map.drawPolygon({
  			paths: poly.path(),
  			strokeColor: '#33CCFF',
  			strokeOpacity: 1,
  			strokeWeight: 1,
  			fillColor: '#33CCFF',
  			fillOpacity: 0.6
  		});
  		map.removeMarkers();
  		map.off('click');
  		console.log(poly.twitterBox());
  	};
  });
});
