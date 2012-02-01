# HTML5 Realtime Push Notifications using Pusher

## PusherNotifier.js

The purpose of the PushNotifier.js library is to make is super easy to add simple Push notifications to any web application. It uses the [jQuery Gritter Growl plugin](http://boedesign.com/blog/2009/07/11/growl-for-jquery-gritter/) for the UI and [Pusher](http://pusher.com) for realtime push notifications.

The first version of this sample shows examples of server functionality in PHP and Ruby with Sinatra. If you'd like to see the example in other languages please [get in touch](http://pusher.com/support).

## How easy is it?

It's as easy as:

1. Include the PusherNotifier.js libraries and the jQuery Gritter files:

         <script src="http://code.jquery.com/jquery-1.7.1.min.js"></script>
         <script src="html5-realtime-push-notifications/src/js/gritter/js/jquery.gritter.min.js"></script>
         <link href="html5-realtime-push-notifications/src/js/gritter/css/jquery.gritter.css"rel="stylesheet" type="text/css" />
         <script src="http://js.pusher.com/1.11/pusher.min.js"></script>
         <script src="html5-realtime-push-notifications/src/js/PusherNotifier.js"></script>
       
2. Create a `PusherNotifier` instance:

         $(function() {
           var pusher = new Pusher('YOUR_APP_KEY');
           var channel = pusher.subscribe('my_notifications');
           var notifier = new PusherNotifier(channel);
         });

3. Trigger events on your server and see them instantly appear in your web app:

   **PHP**

        $app_key = 'YOUR_APP_KEY';
        $app_secret = 'YOUR_APP_SECRET';
        $app_id = 'YOUR_APP_ID';

        $pusher = new Pusher($app_key, $app_secret, $app_id);
        $data = array('message' => 'This is an HTML5 Realtime Push Notification!');
        $pusher->trigger('my_notifications', 'notification', $data);
        
  **Ruby**
        require 'pusher'

        Pusher.app_id = 'YOUR_APP_ID'
        Pusher.key = 'YOUR_APP_KEY'
        Pusher.secret = 'YOUR_APP_SECRET'
  
        data = {'message' => 'This is an HTML5 Realtime Push Notification!'}
        Pusher['my_notifications'].trigger('notification', data)

## Tutorial

A tutorial explaining how to use the example can be found here:
http://pusher.com/tutorials/html5_realtime_push_notifications

## Demo

http://html5-realtime-push-notifications.phpfogapp.com/

## Examples

### PHP

1. Rename `examples/php/config.example.php` to `config.php` and add your Pusher app credentials.
2. Running on a web server navigate to `examples/index.html` to see a side-by-side page example and click the 'Notify' button to trigger a notification.

### Ruby - sinatra

1. Rename `examples/ruby-sinatra/config_example.rb` to `config.rb` and add your Pusher app credentials
2. Update `examples/notify.html` so that the `NOTIFY_ENDPOINT` has the value `/notify`
3. In `examples/ruby-sinatra` run `bundle install` to install the dependencies defined in `examples/ruby-sinatra/Gemfile`
4. Start the Sinatra server by running `bundle exec ruby -rubygems notify.rb`
5. Navigate to http://localhost:4567 (default for sinatra) to see a side-by-side page example and click the 'Notify' button to trigger a notification.