function PusherNotificationHelper(pusher, options) {
  
  options = options || {};
  
  var defaults = {
    channelName: 'notify',
    imageDir: 'images'
  };
  
  $.extend(options, defaults);
  
  var channel = pusher.subscribe(options.channelName);
  channel.bind('created', handleCreated);
  channel.bind('read', handleRead);
  channel.bind('updated', handleUpdated);
  channel.bind('deleted', handleDeleted);
  channel.bind('announce', handleAnnounce);

  function handleCreated(data){
    $.gritter.add({
    	title: 'Created',
    	text: data.message,
    	image: options.imageDir + '/create.png'
    });
  }

  function handleRead(data){
    $.gritter.add({
    	title: 'Read',
    	text: data.message,
    	image: options.imageDir + '/read.png'
    });
  }

  function handleUpdated(data){
    $.gritter.add({
    	title: 'Updated',
    	text: data.message,
    	image: options.imageDir + '/update.png'
    });
  }

  function handleDeleted(data){
    $.gritter.add({
    	title: 'Deleted',
    	text: data.message,
    	image: options.imageDir + '/delete.png'
    });
  }

  function handleAnnounce(data) {
    $.gritter.add({
    	title: 'Announcement',
    	text: data.message.replace(/\\/g, ''),
    	image: options.imageDir + '/announce.png'
    });
  }
  
};