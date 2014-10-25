function App() {
  var circle = new Circle();
  var intervalId, sinceID;
  var waitingTweets = [];
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

  var adjustMap = function(circle) {
    map.drawCircle({
      center: circle.center(),
      radius: circle.radius(),
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

  var tweets = function(twitterCircle) {
    var data = { circle: twitterCircle, sinceID: sinceID }
    $.ajax({
      url: "/",
      type: "post",
      data: data,
      dataType: "json",
      success: function(response) {
        // set the value of sinceID here
        // sinceID = id of last tweet in response
        extractTweets(response["statuses"]);
        // console.log(response["statuses"]);
      },
      error: function() {
        alert("ERROR");
      }
    });
  };

  var extractTweets = function(statuses) {
    for (var i = 0; i < statuses.length; i++) {
      waitingTweets.push(statuses[i]["text"]);
      // waitingTweets.push([statuses[i]["text"], statuses[i]["created_at"]]);
      if ( i === statuses.length - 1 ) { 
        sinceID = statuses[i]["id_str"]; 
      };
    }
    // sinceID = statuses[i]["id_str"];
    // console.log(waitingTweets);
    // console.log(sinceID);
    view.formatTweets(waitingTweets);
    while (waitingTweets.length > 0 ) { waitingTweets.pop(); };
  }

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
      circle.newCoord(new Coord(lat, lng));
      map.addMarker({
        lat: lat,
        lng: lng
      });
      if (circle.hasPair()) {
        adjustMap(circle);
        // set interval for calling tweets(), then start calling it
        intervalId = setInterval(function() { tweets(circle.twitterCircle()) }, 15000);
        // console.log(intervalId);
        view.reset().on('click', function() {
          clearInterval(intervalId);
          view.hideReset();
          // map.refresh(); // THIS DOES NOT WORK
        });
      };
    });
  };
}







