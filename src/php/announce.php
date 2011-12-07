<?php
require_once('config.php');
require_once('../lib/pusher-php/squeeks-Pusher-PHP/lib/Pusher.php');
require_once('../lib/pusher-php/pusher_notification_helper.php');

$pusher = new Pusher(APP_KEY, APP_SECRET, APP_ID);
$helper = new PusherNotificationHelper($pusher);

$message = $_GET['message'];
$message = sanitize($message);

$helper->announce_notification($message);

function sanitize($data) {
  return htmlspecialchars($data);
}
?>

Announcement: <?php echo($message); ?>

<? include('nav.inc.php'); ?>