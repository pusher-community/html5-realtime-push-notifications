function PusherNotifier(channel) {
  channel.bind('notification', this._handleNotification);
};
PusherNotifier.prototype._handleNotification = function(data) {
  $.gritter.add({
   title: 'Notification',
   text: data.message.replace(/\\/g, ''),
   image: 'images/notify.png'
  });
};