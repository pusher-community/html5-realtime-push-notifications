<?php
require_once('lib/squeeks-Pusher-PHP/lib/Pusher.php');
require_once('config.php');

$pusher = new Pusher(APP_KEY, APP_SECRET, APP_ID);

$message = sanitize( $_GET['message'] );
$data = array('message' => $message);

$pusher->trigger('my_notifications', 'notification', $data);

function sanitize($data) {
  return htmlspecialchars($data);
}
?>