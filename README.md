# Emotion Chat App with Embedding Gemma

A real-time chat application with emotion classification for each message using AI models.

## Features

- Real-time messaging using WebSocket (Socket.io)
- Emotion detection for each message
- Clean and modern Material-UI interface
- Typing indicators
- User join/leave notifications
- Emotion visualization with colors and emojis

## Tech Stack

- **Frontend**: React, Material-UI, Socket.io-client
- **Backend**: Node.js, Express, Socket.io
- **AI Model**: @xenova/transformers (with fallback keyword-based detection)

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Install backend dependencies:**
```bash
npm install
```

2. **Install frontend dependencies:**
```bash
cd frontend
npm install
cd ..
```

### Running the Application

#### Option 1: Run both frontend and backend together
```bash
npm run dev
```

#### Option 2: Run separately

**Backend (Terminal 1):**
```bash
npm run server
```

**Frontend (Terminal 2):**
```bash
cd frontend
npm start
```

The backend will run on `http://localhost:5000` and the frontend on `http://localhost:3000`.

## How It Works

1. Users enter a username to join the chat
2. Messages are sent in real-time to all connected users
3. Each message is analyzed for emotion using the AI model
4. Emotions are displayed as colored chips with emojis
5. The app shows typing indicators when users are typing

## Emotion Categories

The app classifies messages into these emotions:
- Joy 😊
- Sadness 😢
- Anger 😠
- Fear 😨
- Surprise 😲
- Love ❤️
- Excitement 🎉
- Frustration 😤
- Disgust 🤢
- Neutral 😐

## Customizing the Emotion Model

To use the actual Embedding Gemma 300M model:

1. Set up the Gemma model locally or via API
2. Update `backend/emotionClassifier.js` to integrate with your Gemma setup
3. Replace the classifier initialization with your Gemma model configuration

## Project Structure

```
embeddinggemma-powered-UI/
├── backend/
│   ├── server.js           # Express server with Socket.io
│   └── emotionClassifier.js # Emotion classification logic
├── frontend/
│   ├── public/
│   └── src/
│       ├── App.js          # Main React component
│       ├── App.css         # Styles
│       └── index.js        # React entry point
├── package.json            # Backend dependencies
└── README.md
```