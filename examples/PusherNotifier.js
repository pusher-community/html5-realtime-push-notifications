function PusherNotifier(channel, options) {
  options = options || {};
  
  this.settings = {
    eventName: 'notification',
    title: 'Notification',
    titleEventProperty: null, // if set the 'title' will not be used and the title will be taken from the event
    image: 'images/notify.png',
    eventTextProperty: 'message',
    gritterOptions: {}
  };
  
  $.extend(this.settings, options);
  
  var self = this;
  channel.bind(this.settings.eventName, function(data){ self._handleNotification(data); });
};
PusherNotifier.prototype._handleNotification = function(data) {
  var gritterOptions = {
   title: (this.settings.titleEventProperty? data[this.settings.titleEventProperty] : this.settings.title),
   text: data[this.settings.eventTextProperty].replace(/\\/g, ''),
   image: this.settings.image
  };
  
  $.extend(gritterOptions, this.settings.gritterOptions);
  
  $.gritter.add(gritterOptions);
};