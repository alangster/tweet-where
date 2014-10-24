get '/' do 
	erb :index
end

post '/' do 
	# return params[:circle]
	# recieving {circle: "latitude,longitude,radiuskm"}
	response = CLIENT.get_tweets(params[:circle])
	content_type :json
	return response.body
	# erb :_tweet, layout: false
end