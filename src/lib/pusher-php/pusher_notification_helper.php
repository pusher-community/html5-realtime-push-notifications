<?php

/**
 * provides a very simple way to send basic Create, Read, Update and Delete (CRUD) event notifications on a 'notify' channel.
 * All events are triggered on a 'notify' channel by default with the event names of 'created', 'read', 'updated' and
 * 'deleted'.
 */
class PusherNotificationHelper
{
  private $pusher = null;
  
  public $channel_name = null;
  
  /**
	* Initializes a new PusherNotificationHelper instance.
	* 
	* @param Pusher $pusher
	* @param string $channel_name [optional] defaults to 'notify'
	*/
  public function __construct( $pusher, $channel_name = null )
	{
	  $this->pusher = $pusher;
	  
	  if( is_null($channel_name) ) {
	    $this->channel_name = 'notify';
	  }
  }
  
  public function create_notification($message, $data = array(), $exclude_socket_id = null) {
    $this->send_notification('created', $message, $data, $exclude_socket_id);
  }
  
  public function read_notification($message, $data = array(), $exclude_socket_id = null) {
    $this->send_notification('read', $message, $data, $exclude_socket_id);
  }

  public function update_notification($message, $data = array(), $exclude_socket_id = null) {
    $this->send_notification('updated', $message, $data, $exclude_socket_id);
  }

  public function delete_notification($message, $data = array(), $exclude_socket_id = null) {
    $this->send_notification('deleted', $message, $data, $exclude_socket_id);
  }
  
  public function announce_notification($message, $data = array(), $exclude_socket_id = null) {
    $this->send_notification('announce', $message, $data, $exclude_socket_id);
  }
  
  private function send_notification($event, $message, $data, $exclude_socket_id) {
    $data[ 'message' ] = $message;
    $this->pusher->trigger($this->channel_name, $event, $data, $exclude_socket_id);
  }
}

?>