const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var {generateMessage, generateLocationMessage} = require('./utils/message');
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connection...');

  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));

  socket.on('disconnect', () => {
    console.log('User disconnected...');
  });

  socket.on('createMessage', (newMessage, callback) => {
    console.log('createMessage:', newMessage);
    io.emit('newMessage', generateMessage(newMessage.from, newMessage.text));
    callback();
  });

  socket.on('createLocationMessage', (coords) => {
  	io.emit('newLocationMessage', generateLocationMessage('Admin', coords.lat, coords.long))
  })
});

server.listen(port, () => {
  console.log(`Starting on port: ${port}`);
});
