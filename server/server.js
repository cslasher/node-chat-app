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
    
    socket.emit('newMessage', {
        from: 'testbo1',
        text: 'What\'s up?',
        createdAt: new Date().getTime()
    });
    
    socket.on('disconnect', () => {
        console.log('User disconnected...');
    });
    
    socket.on('createMessage', (newMessage) => {
        console.log('Create message:', newMessage);
    });
});

server.listen(port, () => {
    console.log(`Starting on port: ${port}`);
});
