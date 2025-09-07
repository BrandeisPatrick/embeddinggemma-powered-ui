import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography, TextField, IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

const emotionEmojis = {
  joy: '😊',
  sadness: '😢',
  anger: '😠',
  fear: '😨',
  surprise: '😲',
  disgust: '🤢',
  neutral: '😐',
  love: '❤️',
  excitement: '🎉',
  frustration: '😤'
};

function IMessageApp({ systemResources }) {
  const [username] = useState('User');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [typingUsers, setTypingUsers] = useState([]);
  const messagesEndRef = useRef(null);
  const typingTimeout = useRef(null);

  useEffect(() => {
    socket.emit('join', username);

    socket.on('previousMessages', (previousMessages) => {
      setMessages(previousMessages);
    });

    socket.on('newMessage', (message) => {
      setMessages(prev => [...prev, message]);
    });

    socket.on('userTyping', ({ username }) => {
      setTypingUsers(prev => {
        if (!prev.includes(username)) {
          return [...prev, username];
        }
        return prev;
      });
    });

    socket.on('userStoppedTyping', ({ username }) => {
      setTypingUsers(prev => prev.filter(u => u !== username));
    });

    return () => {
      socket.off('previousMessages');
      socket.off('newMessage');
      socket.off('userTyping');
      socket.off('userStoppedTyping');
    };
  }, [username]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      socket.emit('message', {
        username,
        text: message
      });
      setMessage('');
      handleStopTyping();
    }
  };

  const handleTyping = () => {
    socket.emit('typing', { username });
    
    if (typingTimeout.current) {
      clearTimeout(typingTimeout.current);
    }
    
    typingTimeout.current = setTimeout(() => {
      handleStopTyping();
    }, 1000);
  };

  const handleStopTyping = () => {
    socket.emit('stopTyping', { username });
    if (typingTimeout.current) {
      clearTimeout(typingTimeout.current);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#000000'
      }}
    >
      {/* Header */}
      <Box
        sx={{
          padding: 2,
          paddingX: 3,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderBottom: '0.5px solid rgba(255, 255, 255, 0.1)'
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: '50%',
              backgroundColor: '#007AFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mr: 2
            }}
          >
            <Typography sx={{ color: 'white', fontWeight: 'bold', fontSize: '18px' }}>
              AI
            </Typography>
          </Box>
          <Box>
            <Typography
              sx={{
                color: '#FFFFFF',
                fontSize: '17px',
                fontWeight: 600,
                fontFamily: '-apple-system, SF Pro Display'
              }}
            >
              AI Assistant
            </Typography>
            <Typography
              sx={{
                color: '#8E8E93',
                fontSize: '13px',
                fontFamily: '-apple-system, SF Pro Display'
              }}
            >
              {systemResources?.model?.isActive ? 'Processing...' : 'Online'}
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Messages */}
      <Box
        sx={{
          flex: 1,
          overflow: 'auto',
          padding: 2,
          paddingX: 3
        }}
      >
        {messages.map((msg, index) => {
          const isOwn = msg.username === username;
          const showAvatar = !isOwn && (index === 0 || messages[index - 1].username !== msg.username);
          
          return (
            <Box
              key={msg.id}
              sx={{
                display: 'flex',
                justifyContent: isOwn ? 'flex-end' : 'flex-start',
                alignItems: 'flex-end',
                mb: 1.5
              }}
            >
              {!isOwn && (
                <Box
                  sx={{
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    backgroundColor: showAvatar ? '#FF6B6B' : 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mr: 1,
                    fontSize: '14px'
                  }}
                >
                  {showAvatar && msg.username[0].toUpperCase()}
                </Box>
              )}
              
              <Box
                sx={{
                  maxWidth: '75%',
                  position: 'relative'
                }}
              >
                <Box
                  sx={{
                    backgroundColor: isOwn ? '#007AFF' : '#1C1C1E',
                    color: '#FFFFFF',
                    padding: '12px 16px',
                    borderRadius: '18px',
                    borderTopRightRadius: isOwn ? '6px' : '18px',
                    borderTopLeftRadius: isOwn ? '18px' : '6px',
                    wordBreak: 'break-word',
                    position: 'relative'
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: '17px',
                      lineHeight: 1.3,
                      fontFamily: '-apple-system, SF Pro Display'
                    }}
                  >
                    {msg.text}
                  </Typography>
                  
                  {msg.emotion && (
                    <Box
                      sx={{
                        position: 'absolute',
                        top: -8,
                        right: -8,
                        backgroundColor: '#000000',
                        borderRadius: '50%',
                        width: 20,
                        height: 20,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '12px',
                        border: '1px solid #1C1C1E'
                      }}
                    >
                      {emotionEmojis[msg.emotion.emotion] || '😐'}
                    </Box>
                  )}
                </Box>
                
                <Typography
                  sx={{
                    fontSize: '13px',
                    color: '#8E8E93',
                    mt: 0.5,
                    textAlign: isOwn ? 'right' : 'left',
                    fontFamily: '-apple-system, SF Pro Display'
                  }}
                >
                  {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </Typography>
              </Box>
            </Box>
          );
        })}
        
        {typingUsers.length > 0 && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'flex-end',
              mb: 2
            }}
          >
            <Box
              sx={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                backgroundColor: '#FF6B6B',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mr: 1,
                fontSize: '14px'
              }}
            >
              AI
            </Box>
            <Box
              sx={{
                backgroundColor: '#1C1C1E',
                padding: '12px 16px',
                borderRadius: '18px',
                borderTopLeftRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}
            >
              <Box sx={{ display: 'flex', gap: 0.5 }}>
                {[1, 2, 3].map((dot) => (
                  <Box
                    key={dot}
                    sx={{
                      width: 6,
                      height: 6,
                      borderRadius: '50%',
                      backgroundColor: '#8E8E93',
                      animation: `pulse 1.4s infinite ${dot * 0.2}s`,
                      '@keyframes pulse': {
                        '0%, 60%, 100%': { opacity: 0.3 },
                        '30%': { opacity: 1 }
                      }
                    }}
                  />
                ))}
              </Box>
            </Box>
          </Box>
        )}
        
        <div ref={messagesEndRef} />
      </Box>

      {/* Input */}
      <Box
        sx={{
          padding: 2,
          paddingX: 3,
          borderTop: '0.5px solid rgba(255, 255, 255, 0.1)',
          backgroundColor: 'rgba(28, 28, 30, 0.95)',
          backdropFilter: 'blur(20px)'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'flex-end',
            gap: 2,
            backgroundColor: '#1C1C1E',
            borderRadius: 3,
            padding: 1
          }}
        >
          <TextField
            multiline
            maxRows={4}
            placeholder="iMessage"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
              handleTyping();
            }}
            onKeyPress={handleKeyPress}
            variant="standard"
            InputProps={{
              disableUnderline: true,
              sx: {
                color: '#FFFFFF',
                fontSize: '17px',
                fontFamily: '-apple-system, SF Pro Display',
                '& input::placeholder': {
                  color: '#8E8E93',
                  opacity: 1
                }
              }
            }}
            sx={{
              flex: 1,
              '& .MuiInput-root': {
                paddingX: 2,
                paddingY: 1
              }
            }}
          />
          <IconButton
            onClick={handleSendMessage}
            disabled={!message.trim()}
            sx={{
              backgroundColor: message.trim() ? '#007AFF' : '#1C1C1E',
              color: message.trim() ? '#FFFFFF' : '#8E8E93',
              width: 32,
              height: 32,
              '&:hover': {
                backgroundColor: message.trim() ? '#0051D0' : '#1C1C1E'
              }
            }}
          >
            <SendIcon fontSize="small" />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
}

export default IMessageApp;