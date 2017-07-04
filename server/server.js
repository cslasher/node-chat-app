const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connection...');

    socket.on('disconnect', () => {
        console.log('User disconnected...');
    });

    socket.on('createMessage', (newMessage) => {
        console.log('Create message:', newMessage);
        io.emit('newMessage', {
        	from: newMessage.from,
        	text: newMessage.text,
        	createdAt: new Date().getTime()
        })
    });
});

server.listen(port, () => {
    console.log(`Starting on port: ${port}`);
});
