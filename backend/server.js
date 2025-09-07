const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const path = require('path');
const emotionClassifier = require('./emotionClassifier');
const resourceMonitor = require('./resourceMonitor');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(express.json());

// Store messages in memory (in production, use a database)
let messages = [];
let users = new Map();

io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);
  
  socket.on('join', (username) => {
    users.set(socket.id, username);
    socket.emit('previousMessages', messages);
    io.emit('userJoined', { username, userId: socket.id });
  });
  
  socket.on('message', async (data) => {
    try {
      // Mark model as active when processing
      resourceMonitor.setModelActive(true);
      
      // Simulate processing time for Embedding Gemma 300M (200-500ms)
      const processingTime = 200 + Math.random() * 300;
      await new Promise(resolve => setTimeout(resolve, processingTime));
      
      // Classify emotion for the message
      const emotion = await emotionClassifier.classifyEmotion(data.text);
      
      // Keep model active for a bit longer to show resource usage
      setTimeout(() => resourceMonitor.setModelActive(false), 1000);
      
      const messageWithEmotion = {
        id: Date.now(),
        userId: socket.id,
        username: data.username,
        text: data.text,
        emotion: emotion,
        timestamp: new Date().toISOString()
      };
      
      messages.push(messageWithEmotion);
      
      // Keep only last 100 messages
      if (messages.length > 100) {
        messages = messages.slice(-100);
      }
      
      io.emit('newMessage', messageWithEmotion);
    } catch (error) {
      console.error('Error processing message:', error);
      socket.emit('error', 'Failed to process message');
    }
  });
  
  socket.on('typing', (data) => {
    socket.broadcast.emit('userTyping', data);
  });
  
  socket.on('stopTyping', (data) => {
    socket.broadcast.emit('userStoppedTyping', data);
  });
  
  socket.on('disconnect', () => {
    const username = users.get(socket.id);
    users.delete(socket.id);
    if (username) {
      io.emit('userLeft', { username, userId: socket.id });
    }
    console.log('Client disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log('Resource monitoring enabled');
  // Start resource monitoring
  resourceMonitor.startMonitoring(io);
});