function App() {
  var poly = new Polygon();
  var intervalId;
  var view = new View();
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

  var adjustMap = function(path) {
    map.drawPolygon({
      paths: path,
      strokeColor: '#33CCFF',
      strokeOpacity: 1,
      strokeWeight: 1,
      fillColor: '#33CCFF',
      fillOpacity: 0.6
    });
    map.removeMarkers();
    map.off('click');
    view.showReset();
  };

  var tweets = function(twitterBox) {
    var data = { coords: twitterBox.join() }
    $.ajax({
      url: "/",
      type: "post",
      data: data,
      dataType: "html",
      success: function(response) {
        view.showTweets(response);
      }
    });
    console.log(data);
  };

  this.initialize = function() {
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
        adjustMap(poly.path());
        // set interval for calling tweets(), then start calling it
        intervalId = setInterval(function() { tweets(poly.twitterBox()) }, 1000);
        // console.log(intervalId);
        view.reset().on('click', function() {
          clearInterval(intervalId);
          view.hideReset();
          map.refresh();
        });
      };
    });
  };
}







