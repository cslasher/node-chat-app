  var socket = io();

  socket.on('connect', function() {
    console.log('Connected to server...');
    
    socket.emit('createMessage', {
      to: 'testbo1',
      text: 'Hi, not much.'
    });
  });

  socket.on('disconnect', function() {
    console.log('Disconnected from server...');
  });

  socket.on('newMessage', function(message) {
    console.log('New message...', message);
  })