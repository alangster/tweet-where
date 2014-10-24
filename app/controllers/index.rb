get '/' do 
	erb :index
end

post '/' do 
	
	erb :_tweet, layout: false
end