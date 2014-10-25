function View() {

	var reset = $('#reset');

	var display = function(formattedTweets) {
		for (var i = 0; i < formattedTweets.length; i++) {
			sleep(2000 * i, formattedTweets[i], function(data) {$('#tweets').prepend(data).fadeIn("slow")});
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

function sleep(millis, data, callback) {
	setTimeout(function() {callback(data);}, millis);
}

