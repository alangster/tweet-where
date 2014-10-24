function Coord(lat, lng) {
	var latitude = lat;
	var longitude = lng;
	this.position = function() {
		return [latitude, longitude];
	};
	this.latitude = function() {
		return latitude;
	};
	this.longitude = function() {
		return longitude
	};
}
