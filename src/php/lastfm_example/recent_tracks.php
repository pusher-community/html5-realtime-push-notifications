<?php
$username = 'philipnorton42';
$scrobbler_url = "http://ws.audioscrobbler.com/2.0/user/" . $username . "/recenttracks";
 
if ($scrobbler_xml = file_get_contents($scrobbler_url)) {
    $scrobbler_data = simplexml_load_string($scrobbler_xml);    
     
    echo '<ul>';
    foreach ($scrobbler_data->track as $track) {
        $string = '<li>';
        $string .= '<div class="cover"><img width="28" height="28" class="cover" src="' . $track->image[0] . '" /></div>';
        $string .= '<p><span class="title">' . $track->artist . '</span><br />' . $track->name . '</p>';
        $string .= '<p>Played: ' . $track->date . '</p>';
        $string .= '</li>';
        echo $string;
    }
    echo '</ul>';
}
?>