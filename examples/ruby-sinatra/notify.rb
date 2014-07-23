require './config.rb'

require 'sinatra'
require 'pusher'
require 'json'

include Rack::Utils

set :public_folder, '../'

get '/' do
  send_file('../index.html')
end

get '/notify' do
  
  message = params[:message]

  if( !message )
    status 400
    body 'message must be provided'
  end

  message = sanitise_input(message)
  data = {'message' => message}
  response = Pusher['my_notifications'].trigger('notification', data)

  result = {'activity' => data, 'pusherResponse' => response}

  status 200
  headers \
    'Cache-Control' =>  'no-cache, must-revalidate',
    'Content-Type' =>  'application/json'

  body result.to_json
end

def get_content_type(type)
  case type
  when "css"
    return 'text/css'
  when "js"
    return 'text/javascript'
  else
    return 'text/plain'
  end
end

def sanitise_input(message) 
  return escape_html(message).slice(0, 300)
end