function Polygon() {
	var coordinatePairs = [];
	var coordObjects = [];
	var north, south, east, west, southWest, northEast

	var completeSet = function() {
		findEastAndWest();
		findNorthAndSouth();
		coordinatePairs.push([south, west]);
		coordinatePairs.push([north, west]);
		coordinatePairs.push([north, east]);
		coordinatePairs.push([south, east]);
	};

	var findEastAndWest = function() {
		if (coordObjects[0].longitude() > coordObjects[1].longitude()) {
			east = coordObjects[0].longitude();
			west = coordObjects[1].longitude();
		} else {
			east = coordObjects[1].longitude();
			west = coordObjects[0].longitude();
		};
	};

	var findNorthAndSouth = function() {
		if (coordObjects[0].latitude() > coordObjects[1].latitude()) {
			north = coordObjects[0].latitude();
			south = coordObjects[1].latitude();
		} else {
			north = coordObjects[1].latitude();
			south = coordObjects[0].latitude();
		};
	};

	this.newCoord = function(coord) {
		coordObjects.push(coord);
	};

	this.hasPair = function() {
		if (coordObjects.length === 2) {
			completeSet();
			return true;
		} else {
			return false;
		};
	};

	this.path = function() {
		return coordinatePairs;
	};

	this.twitterBox = function() {
		var box = [];
		box.push(south);
		box.push(west);
		box.push(north);
		box.push(east);
		return box;
	}
}