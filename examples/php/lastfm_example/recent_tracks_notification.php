<?
require_once('../config.php');
require_once('../../lib/pusher-php/squeeks-Pusher-PHP/lib/Pusher.php');
require_once('../../lib/pusher-php/pusher_notification_helper.php');

$username = 'philipnorton42';
$scrobbler_url = "http://ws.audioscrobbler.com/2.0/user/" . $username . "/recenttracks";
 
if ($scrobbler_xml = file_get_contents($scrobbler_url)) {
    $scrobbler_data = simplexml_load_string($scrobbler_xml);    
    
    $pusher = new Pusher(APP_KEY, APP_SECRET, APP_ID);
    $helper = new PusherNotificationHelper($pusher);

    foreach ($scrobbler_data->track as $track) {
        $string = '<div>';
        $string .= '<div class="cover"><img width="28" height="28" class="cover" src="' . $track->image[0] . '" /></div>';
        $string .= '<p><span class="title">' . $track->artist . '</span><br />' . $track->name . '</p>';
        $string .= '<p>Played: ' . $track->date . '</p>';
        $string .= '</div>';
        
        $helper->announce_notification($string);
    }
}
?>