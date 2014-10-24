function View() {

	var reset = $('#reset');

	this.showReset = function() {
	  reset.show();
	};

	this.reset = function() {
		return reset;
	}

	this.hideReset = function() {
		reset.hide();
	}

	this.showTweets = function(tweets) {
		$('#tweets').append(tweets);
	}

};