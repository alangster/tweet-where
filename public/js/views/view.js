function View() {

	var reset = $('#reset');

	var display = function(formattedTweets) {
		for (var i = 0; i < formattedTweets.length; i++) {
			$('#tweets').html(formattedTweets[i]);
			sleep(500, waitHelper());
		}
	};

	this.showReset = function() {
	  reset.show();
	};

	this.reset = function() {
		return reset;
	}

	this.hideReset = function() {
		reset.hide();
	}

	this.formatTweets = function(tweets) {
		var formattedTweets = [];
		for (var i = 0; i < tweets.length; i++) {
			formattedTweets.push("<p>" + tweets[i] + "</p>");
		}
		display(formattedTweets);
	}
};

function sleep(millis, callback) {
	setTimeout(function() {callback;}, millis);
}

function waitHelper() { "a"; };