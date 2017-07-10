/*global io, jQuery, moment, navigator, Mustache*/
var socket = io();

function scrollToBottom() {
  var messages = jQuery('#messages');
  var newMessage = messages.children('li:last-child');
  
  var clientHeight = messages.prop('clientHeight');
  var scrollTop = messages.prop('scrollTop');
  var scrollHeight = messages.prop('scrollHeight');
  var newMessageHeight = newMessage.innerHeight();
  var lastMessageHeight = newMessage.prev().innerHeight();
  
  if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
    messages.scrollTop(scrollHeight);
  }
}

socket.on('connect', function() {
  console.log('Connected to server...');

});

socket.on('disconnect', function() {
  console.log('Disconnected from server...');
});

socket.on('newMessage', function(message) {
  var formattedTime = moment().format("h:mm a");  
  var template = jQuery('#message-template').html();
  var html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    createdAt: formattedTime
  });
  
  jQuery('#messages').append(html);
  scrollToBottom();
});

socket.on('newLocationMessage', function(message) {
  var formattedTime = moment().format("h:mm a");
  var template = jQuery('#location-message-template').html();
  var html = Mustache.render(template, {
    url: message.url,
    from: message.from,
    createdAt: formattedTime
  });
  
  jQuery('#messages').append(html);  
  scrollToBottom();
});


jQuery('#message-form').on('submit', function(e) {
  e.preventDefault();
  
  var messageBox = jQuery('[name=message]')

  socket.emit('createMessage', {
    from: 'User',
    text: messageBox.val()
  }, function() {
    messageBox.val('');
  });
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function() {
  if (!navigator.geolocation) {
    return alert('Geolocation not supported by the browser...');
  }
  
  locationButton.attr('disabled', 'disabled').text('Sending location...');
  
  navigator.geolocation.getCurrentPosition(function (position) {
    locationButton.removeAttr('disabled').text('Send location');
    socket.emit('createLocationMessage', {
      lat: position.coords.latitude,
      long: position.coords.longitude
    });
  }, function () {
    locationButton.removeAttr('disabled').text('Send location');
    alert('Unable to fetch current location...');
  });
});
