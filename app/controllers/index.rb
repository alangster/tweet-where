get '/' do 
	erb :index
end

post '/' do 
	# return params[:circle]
	# recieving {circle: "latitude,longitude,radiuskm"}
	response = CLIENT.get_tweets(params[:circle], params[:sinceID])
	content_type :json
	return response.body 
end