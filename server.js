const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000', // Frontend origin
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('drawing', (data) => {
    socket.broadcast.emit('drawing', data);
  });

  socket.on('message', (data) => {
    io.emit('message', data);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

server.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
