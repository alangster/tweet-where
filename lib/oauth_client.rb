require 'uri'
require 'net/http'
require 'simple_oauth'

class OAuthClient
  attr_reader :credentials

  def initialize(credentials)
    raise ArgumentError, "must provide consumer_key, consumer_secret, token, and token_secret" unless valid_credentials?(credentials)
    @credentials = credentials
  end

  def get_tweets(circle, since = nil)
    url = "https://api.twitter.com/1.1/search/tweets.json?q=e&geocode=" + circle
    uri = URI(url)
    request = Net::HTTP::Get.new(uri)
    request["Authorization"] = oauth_header_get(request)
    response = Net::HTTP.start(uri.host, uri.port, :use_ssl => uri.scheme == 'https') do |http|
      http.request(request)
    end
    return response
  end

  private

  # A helper method to generate the OAuth Authorization header given
  # an Net::HTTP::GenericRequest object and a Hash of params
  def oauth_header_get(request, params = {})
    SimpleOAuth::Header.new(request.method, request.uri, {}, credentials).to_s
  end

  def valid_credentials?(credentials)
    [:consumer_key, :consumer_secret, :token, :token_secret].all? { |key| credentials[key] }
  end
end
