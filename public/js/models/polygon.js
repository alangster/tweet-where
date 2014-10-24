function Circle() {
	var coordObjects = [];
	var centerCoord, radius;

	var distanceApart = function() {
		// edgeCoord = 2; centerCoord = 1
		var edgeCoord = coordObjects[1];
		var latOne = centerCoord.latitude().toRad(), latTwo = edgeCoord.latitude().toRad(), longOne = centerCoord.longitude(), longTwo = edgeCoord.longitude();
		var dlon = (longTwo - longOne).toRad();
		var dlat = (latTwo - latOne).toRad();
		var a = Math.pow(Math.sin(dlat / 2), 2) + Math.cos(latOne) * Math.cos(latTwo) * Math.pow(Math.sin(dlon / 2), 2);
		var c = 2 * Math.atan2( Math.sqrt(a), Math.sqrt(1 - a) );
		// 6371 is the earth's radius, in km, so d is in km
		var d = 6371 * c;
		return d * 1000;
	};

	this.newCoord = function(coord) {
		coordObjects.push(coord);
	};

	this.hasPair = function() {
		if (coordObjects.length === 2) {
			return true;
		} else {
			return false;
		};
	};

	this.center = function() {
		centerCoord = coordObjects[0];
		return { lat: centerCoord.latitude(), lng: centerCoord.longitude() };
	};

	this.radius = function() {
		if (radius === undefined) { radius = distanceApart(); };
		return 2 * radius;
	};

	this.twitterCircle = function() {
		var radiusInKm = radius / 1000;
		return "" + centerCoord.latitude() + "," + centerCoord.longitude() + "," + radiusInKm + "km";
	};


}

if (typeof(Number.prototype.toRad) === "undefined") {
  Number.prototype.toRad = function() {
    return this * Math.PI / 180;
  }
}
