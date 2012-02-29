function PusherNotifier(channel, options) {
  options = options || {};
  
  this.settings = {
    eventName: 'notifications',
    title: 'Notification',
    image: 'images/notify.png',
    eventTextProperty: 'message'
  };
  
  $.extend(this.settings, options);
  
  var self = this;
  channel.bind(this.settings.eventName, function(data){ self._handleNotification(data); });
};
PusherNotifier.prototype._handleNotification = function(data) {
  $.gritter.add({
   title: this.settings.title,
   text: data[this.settings.eventTextProperty].replace(/\\/g, ''),
   image: this.settings.image
  });
};