import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography, TextField } from '@mui/material';
import io from 'socket.io-client';

const socket = io('http://localhost:5001');

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
  const [sendingMessage, setSendingMessage] = useState(false);
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
    if (message.trim() && !sendingMessage) {
      setSendingMessage(true);
      
      // Animate send button
      setTimeout(() => {
        socket.emit('message', {
          username,
          text: message
        });
        setMessage('');
        handleStopTyping();
        setSendingMessage(false);
      }, 100);
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
        background: 'linear-gradient(180deg, #F2F2F7 0%, #FFFFFF 100%)'
      }}
    >
      {/* iOS Messages Header */}
      <Box
        sx={{
          background: 'rgba(248, 248, 248, 0.94)',
          backdropFilter: 'blur(20px)',
          borderBottom: '0.5px solid rgba(0, 0, 0, 0.1)',
          position: 'relative'
        }}
      >
        {/* Navigation Bar */}
        <Box
          sx={{
            height: 44,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            px: 2
          }}
        >
          {/* Back Button */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
              minWidth: 60
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="#007AFF">
              <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
            </svg>
            <Typography
              sx={{
                color: '#007AFF',
                fontSize: '17px',
                fontWeight: 400,
                fontFamily: '-apple-system, SF Pro Display',
                ml: 0.5
              }}
            >
              Messages
            </Typography>
          </Box>

          {/* Contact Info - Center */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
              flex: 1,
              maxWidth: 200
            }}
          >
            <Typography
              sx={{
                color: '#000000',
                fontSize: '17px',
                fontWeight: 600,
                fontFamily: '-apple-system, SF Pro Display',
                textAlign: 'center'
              }}
            >
              AI Assistant
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Box
                sx={{
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  backgroundColor: systemResources?.model?.isActive ? '#FF9500' : '#34C759',
                  animation: systemResources?.model?.isActive ? 'pulse 2s infinite' : 'none',
                  '@keyframes pulse': {
                    '0%': { opacity: 1 },
                    '50%': { opacity: 0.5 },
                    '100%': { opacity: 1 }
                  }
                }}
              />
              <Typography
                sx={{
                  color: '#8E8E93',
                  fontSize: '13px',
                  fontFamily: '-apple-system, SF Pro Display'
                }}
              >
                {systemResources?.model?.isActive ? 'Processing' : 'Online'}
              </Typography>
            </Box>
          </Box>

          {/* Action Buttons */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              minWidth: 60,
              justifyContent: 'flex-end'
            }}
          >
            {/* FaceTime Video */}
            <Box
              sx={{
                width: 28,
                height: 28,
                borderRadius: '50%',
                backgroundColor: 'transparent',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                '&:hover': {
                  backgroundColor: 'rgba(0,0,0,0.05)'
                }
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="#007AFF">
                <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"/>
              </svg>
            </Box>
            
            {/* Phone */}
            <Box
              sx={{
                width: 28,
                height: 28,
                borderRadius: '50%',
                backgroundColor: 'transparent',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                '&:hover': {
                  backgroundColor: 'rgba(0,0,0,0.05)'
                }
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#007AFF">
                <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/>
              </svg>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Messages */}
      <Box
        sx={{
          flex: 1,
          overflow: 'auto',
          padding: '12px 16px',
          '&::-webkit-scrollbar': {
            display: 'none'
          },
          scrollbarWidth: 'none'
        }}
      >
        {messages.map((msg, index) => {
          const isOwn = msg.username === username;
          const prevMsg = messages[index - 1];
          const nextMsg = messages[index + 1];
          
          const isFirstInGroup = !prevMsg || prevMsg.username !== msg.username;
          const isLastInGroup = !nextMsg || nextMsg.username !== msg.username;
          
          const showTime = isFirstInGroup || 
            (prevMsg && new Date(msg.timestamp) - new Date(prevMsg.timestamp) > 300000); // 5 minutes
          
          return (
            <React.Fragment key={msg.id}>
              {/* Time Divider */}
              {showTime && (
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    my: 2
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: '13px',
                      color: '#8E8E93',
                      fontFamily: '-apple-system, SF Pro Display',
                      fontWeight: 400
                    }}
                  >
                    {new Date(msg.timestamp).toLocaleTimeString([], { 
                      hour: 'numeric', 
                      minute: '2-digit',
                      hour12: true 
                    })}
                  </Typography>
                </Box>
              )}
              
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: isOwn ? 'flex-end' : 'flex-start',
                  alignItems: 'flex-end',
                  mb: isLastInGroup ? 1.5 : 0.5,
                  px: isOwn ? '60px 0 0 0' : '0 60px 0 0'
                }}
              >
                <Box
                  sx={{
                    position: 'relative',
                    maxWidth: '100%'
                  }}
                >
                  {/* Message Bubble with Tail */}
                  <Box
                    sx={{
                      position: 'relative',
                      backgroundColor: isOwn ? '#007AFF' : '#E5E5EA',
                      color: isOwn ? '#FFFFFF' : '#000000',
                      padding: '8px 12px',
                      borderRadius: '18px',
                      borderBottomRightRadius: isOwn && isLastInGroup ? '4px' : '18px',
                      borderBottomLeftRadius: !isOwn && isLastInGroup ? '4px' : '18px',
                      wordBreak: 'break-word',
                      fontSize: '17px',
                      lineHeight: '22px',
                      fontFamily: '-apple-system, SF Pro Display',
                      fontWeight: 400,
                      boxShadow: isOwn 
                        ? 'none'
                        : '0 1px 2px rgba(0, 0, 0, 0.1)',
                      
                      // Message animation on entry
                      animation: index === messages.length - 1 ? 'messageSlideIn 0.3s ease-out' : 'none',
                      '@keyframes messageSlideIn': {
                        '0%': {
                          opacity: 0,
                          transform: 'translateY(10px) scale(0.95)'
                        },
                        '100%': {
                          opacity: 1,
                          transform: 'translateY(0) scale(1)'
                        }
                      },
                      
                      // Message Tail using CSS
                      '&::after': isLastInGroup ? {
                        content: '""',
                        position: 'absolute',
                        bottom: 0,
                        width: 0,
                        height: 0,
                        border: '6px solid transparent',
                        ...(isOwn ? {
                          right: '-6px',
                          borderLeftColor: '#007AFF',
                          borderRight: 'none'
                        } : {
                          left: '-6px', 
                          borderRightColor: '#E5E5EA',
                          borderLeft: 'none'
                        })
                      } : {}
                    }}
                  >
                    {msg.text}
                    
                    {/* Emotion Badge */}
                    {msg.emotion && (
                      <Box
                        sx={{
                          position: 'absolute',
                          top: -10,
                          right: -10,
                          backgroundColor: '#FFFFFF',
                          borderRadius: '50%',
                          width: 24,
                          height: 24,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '14px',
                          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
                          border: '2px solid #FFFFFF'
                        }}
                      >
                        {emotionEmojis[msg.emotion.emotion] || '😐'}
                      </Box>
                    )}
                  </Box>
                  
                  {/* Read Receipt */}
                  {isOwn && isLastInGroup && (
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        mt: 0.5,
                        mr: 1
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: '13px',
                          color: '#8E8E93',
                          fontFamily: '-apple-system, SF Pro Display'
                        }}
                      >
                        Delivered
                      </Typography>
                    </Box>
                  )}
                </Box>
              </Box>
            </React.Fragment>
          );
        })}
        
        {typingUsers.length > 0 && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'flex-end',
              mb: 2,
              px: '0 60px 0 0'
            }}
          >
            <Box
              sx={{
                backgroundColor: '#E5E5EA',
                padding: '12px 16px',
                borderRadius: '18px',
                borderBottomLeftRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                position: 'relative',
                boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
                
                // Typing indicator tail
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: 0,
                  left: '-6px',
                  width: 0,
                  height: 0,
                  border: '6px solid transparent',
                  borderRightColor: '#E5E5EA',
                  borderLeft: 'none'
                }
              }}
            >
              <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center' }}>
                {[1, 2, 3].map((dot) => (
                  <Box
                    key={dot}
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      backgroundColor: '#8E8E93',
                      animation: `pulse 1.4s infinite ${dot * 0.2}s`,
                      '@keyframes pulse': {
                        '0%, 60%, 100%': { 
                          transform: 'scale(1)',
                          opacity: 0.5 
                        },
                        '30%': { 
                          transform: 'scale(1.2)',
                          opacity: 1 
                        }
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

      {/* iOS Messages Input Bar */}
      <Box
        sx={{
          background: 'rgba(248, 248, 248, 0.94)',
          backdropFilter: 'blur(20px)',
          borderTop: '0.5px solid rgba(0, 0, 0, 0.1)',
          padding: '8px 16px 8px 16px',
          paddingBottom: '8px'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'flex-end',
            gap: 1.5,
            maxHeight: '120px'
          }}
        >
          {/* Plus Button */}
          <Box
            sx={{
              width: 32,
              height: 32,
              borderRadius: '50%',
              backgroundColor: '#E5E5EA',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              flexShrink: 0,
              '&:hover': {
                backgroundColor: '#D1D1D6'
              },
              '&:active': {
                transform: 'scale(0.95)'
              }
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="#8E8E93">
              <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
            </svg>
          </Box>

          {/* Message Input Container */}
          <Box
            sx={{
              flex: 1,
              backgroundColor: '#FFFFFF',
              borderRadius: '18px',
              border: '1px solid #E5E5EA',
              display: 'flex',
              alignItems: 'flex-end',
              minHeight: '36px',
              maxHeight: '100px',
              position: 'relative'
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
                  color: '#000000',
                  fontSize: '17px',
                  fontFamily: '-apple-system, SF Pro Display',
                  lineHeight: '22px',
                  py: '6px',
                  px: '12px',
                  '& textarea': {
                    resize: 'none',
                    '&::placeholder': {
                      color: '#8E8E93',
                      opacity: 1
                    }
                  }
                }
              }}
              sx={{
                flex: 1,
                '& .MuiInput-root': {
                  width: '100%'
                }
              }}
            />
            
            {/* Send Button - appears when there's text */}
            {message.trim() && (
              <Box
                sx={{
                  position: 'absolute',
                  right: '4px',
                  bottom: '4px'
                }}
              >
                <Box
                  onClick={handleSendMessage}
                  sx={{
                    width: 28,
                    height: 28,
                    borderRadius: '50%',
                    backgroundColor: '#007AFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    transform: sendingMessage ? 'scale(0.9) rotate(45deg)' : 'scale(1) rotate(0deg)',
                    opacity: sendingMessage ? 0.7 : 1,
                    '&:hover': {
                      backgroundColor: '#0051D0',
                      transform: sendingMessage ? 'scale(0.9) rotate(45deg)' : 'scale(1.05) rotate(0deg)'
                    },
                    '&:active': {
                      transform: 'scale(0.9) rotate(15deg)'
                    }
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                  </svg>
                </Box>
              </Box>
            )}
          </Box>

          {/* Microphone/Audio Button */}
          {!message.trim() && (
            <Box
              sx={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                backgroundColor: '#E5E5EA',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                flexShrink: 0,
                '&:hover': {
                  backgroundColor: '#D1D1D6'
                },
                '&:active': {
                  transform: 'scale(0.95)'
                }
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#8E8E93">
                <path d="M12 14c1.66 0 2.99-1.34 2.99-3L15 5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z"/>
              </svg>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default IMessageApp;