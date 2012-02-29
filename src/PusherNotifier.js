function PusherNotifier(channel, options) {
  options = options || {};
  
  this.settings = {
    eventName: 'notifications',
    title: 'Notification',
    image: 'images/notify.png'
  };
  
  $.extend(this.settings, options);
  
  var self = this;
  channel.bind(this.settings.eventName, function(data){ self._handleNotification(data); });
};
PusherNotifier.prototype._handleNotification = function(data) {
  $.gritter.add({
   title: this.settings.title,
   text: data.message.replace(/\\/g, ''),
   image: this.settings.image
  });
};