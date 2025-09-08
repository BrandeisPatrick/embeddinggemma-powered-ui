import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';

function MessagesList({ onSelectConversation }) {
  const [searchText, setSearchText] = useState('');

  const conversations = [
    {
      id: 1,
      name: 'AI Assistant',
      lastMessage: 'Thank you! This is powered by EmbeddingGemma with authentic iOS styling...',
      timestamp: 'now',
      avatar: '🤖',
      unreadCount: 0,
      isOnline: true,
      messages: [
        {
          id: 1,
          username: 'AI Assistant',
          text: 'Hello! Welcome to the iOS-style Messages demo!',
          timestamp: Date.now() - 3600000,
          emotion: { emotion: 'joy', confidence: 0.95 }
        },
        {
          id: 2,
          username: 'User',
          text: 'This looks amazing! The UI is so smooth.',
          timestamp: Date.now() - 3000000
        },
        {
          id: 3,
          username: 'AI Assistant',
          text: 'Thank you! This is powered by EmbeddingGemma with authentic iOS styling, complete with message bubbles, animations, and circular progress bars.',
          timestamp: Date.now() - 1800000,
          emotion: { emotion: 'excitement', confidence: 0.88 }
        }
      ]
    },
    {
      id: 2,
      name: 'Sarah Wilson',
      lastMessage: 'Perfect! See you at 3pm 👍',
      timestamp: '2:15 PM',
      avatar: '👩‍💼',
      unreadCount: 0,
      isOnline: false,
      messages: [
        {
          id: 4,
          username: 'Sarah Wilson',
          text: 'Hey! Are we still on for the meeting today?',
          timestamp: Date.now() - 7200000
        },
        {
          id: 5,
          username: 'User',
          text: 'Yes! Conference room B at 3pm right?',
          timestamp: Date.now() - 6000000
        },
        {
          id: 6,
          username: 'Sarah Wilson',
          text: 'Perfect! See you at 3pm 👍',
          timestamp: Date.now() - 5400000
        }
      ]
    },
    {
      id: 3,
      name: 'Tech Team',
      lastMessage: 'Great work everyone! 🚀',
      timestamp: '1:30 PM',
      avatar: '👥',
      unreadCount: 3,
      isOnline: true,
      messages: [
        {
          id: 7,
          username: 'Mike Chen',
          text: 'Just pushed the latest updates to staging',
          timestamp: Date.now() - 10800000
        },
        {
          id: 8,
          username: 'Emily Rodriguez',
          text: 'Testing looks good! Ready to deploy?',
          timestamp: Date.now() - 9000000
        },
        {
          id: 9,
          username: 'Alex Thompson',
          text: 'Great work everyone! 🚀',
          timestamp: Date.now() - 7800000
        }
      ]
    },
    {
      id: 4,
      name: 'Mom',
      lastMessage: 'Love you too! Have a great day ❤️',
      timestamp: '11:45 AM',
      avatar: '❤️',
      unreadCount: 0,
      isOnline: false,
      messages: [
        {
          id: 10,
          username: 'Mom',
          text: 'Good morning sweetie! Hope you have a wonderful day',
          timestamp: Date.now() - 18000000
        },
        {
          id: 11,
          username: 'User',
          text: 'Thanks mom! Love you ❤️',
          timestamp: Date.now() - 16200000
        },
        {
          id: 12,
          username: 'Mom',
          text: 'Love you too! Have a great day ❤️',
          timestamp: Date.now() - 16020000
        }
      ]
    },
    {
      id: 5,
      name: 'David Park',
      lastMessage: 'Sounds like a plan! 🎯',
      timestamp: 'Yesterday',
      avatar: '🏃‍♂️',
      unreadCount: 0,
      isOnline: true,
      messages: [
        {
          id: 13,
          username: 'David Park',
          text: 'Want to grab lunch tomorrow?',
          timestamp: Date.now() - 86400000
        },
        {
          id: 14,
          username: 'User',
          text: 'Sure! How about that new place on 5th street?',
          timestamp: Date.now() - 82800000
        },
        {
          id: 15,
          username: 'David Park',
          text: 'Sounds like a plan! 🎯',
          timestamp: Date.now() - 82200000
        }
      ]
    }
  ];

  const filteredConversations = conversations.filter(conv =>
    conv.name.toLowerCase().includes(searchText.toLowerCase())
  );

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
          position: 'sticky',
          top: 0,
          zIndex: 10
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
          {/* Left side */}
          <Box sx={{ minWidth: 60 }}>
            <Typography
              sx={{
                color: '#007AFF',
                fontSize: '17px',
                fontWeight: 400,
                fontFamily: '-apple-system, SF Pro Display'
              }}
            >
              Edit
            </Typography>
          </Box>

          {/* Center title */}
          <Typography
            sx={{
              color: '#000000',
              fontSize: '17px',
              fontWeight: 600,
              fontFamily: '-apple-system, SF Pro Display'
            }}
          >
            Messages
          </Typography>

          {/* Right side */}
          <Box
            sx={{
              minWidth: 60,
              display: 'flex',
              justifyContent: 'flex-end'
            }}
          >
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
                <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
              </svg>
            </Box>
          </Box>
        </Box>

        {/* Search Bar */}
        <Box sx={{ px: 2, pb: 1 }}>
          <Box
            sx={{
              backgroundColor: '#E5E5EA',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              px: 2,
              py: 1
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="#8E8E93" style={{ marginRight: 8 }}>
              <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
            </svg>
            <input
              placeholder="Search"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              style={{
                border: 'none',
                outline: 'none',
                background: 'transparent',
                fontSize: '17px',
                fontFamily: '-apple-system, SF Pro Display',
                color: '#000000',
                width: '100%',
                '::placeholder': {
                  color: '#8E8E93'
                }
              }}
            />
          </Box>
        </Box>
      </Box>

      {/* Conversations List */}
      <Box
        sx={{
          flex: 1,
          overflow: 'auto',
          '&::-webkit-scrollbar': {
            display: 'none'
          },
          scrollbarWidth: 'none'
        }}
      >
        {filteredConversations.map((conversation) => (
          <Box
            key={conversation.id}
            onClick={() => onSelectConversation(conversation)}
            sx={{
              display: 'flex',
              alignItems: 'center',
              padding: '12px 16px',
              borderBottom: '0.5px solid rgba(0, 0, 0, 0.1)',
              cursor: 'pointer',
              transition: 'background-color 0.2s ease',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.05)'
              },
              '&:active': {
                backgroundColor: 'rgba(0, 0, 0, 0.1)'
              }
            }}
          >
            {/* Avatar */}
            <Box
              sx={{
                position: 'relative',
                mr: 2
              }}
            >
              <Box
                sx={{
                  width: 50,
                  height: 50,
                  borderRadius: '50%',
                  backgroundColor: '#E5E5EA',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '24px'
                }}
              >
                {conversation.avatar}
              </Box>
              
              {/* Online indicator */}
              {conversation.isOnline && (
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 2,
                    right: 2,
                    width: 12,
                    height: 12,
                    borderRadius: '50%',
                    backgroundColor: '#34C759',
                    border: '2px solid white'
                  }}
                />
              )}
            </Box>

            {/* Content */}
            <Box
              sx={{
                flex: 1,
                minWidth: 0
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                  mb: 0.5
                }}
              >
                <Typography
                  sx={{
                    color: '#000000',
                    fontSize: '17px',
                    fontWeight: 600,
                    fontFamily: '-apple-system, SF Pro Display',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    maxWidth: '200px'
                  }}
                >
                  {conversation.name}
                </Typography>
                
                <Typography
                  sx={{
                    color: '#8E8E93',
                    fontSize: '15px',
                    fontFamily: '-apple-system, SF Pro Display',
                    flexShrink: 0,
                    ml: 1
                  }}
                >
                  {conversation.timestamp}
                </Typography>
              </Box>

              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <Typography
                  sx={{
                    color: '#8E8E93',
                    fontSize: '15px',
                    fontFamily: '-apple-system, SF Pro Display',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    flex: 1,
                    mr: 1
                  }}
                >
                  {conversation.lastMessage}
                </Typography>

                {/* Unread count */}
                {conversation.unreadCount > 0 && (
                  <Box
                    sx={{
                      backgroundColor: '#007AFF',
                      borderRadius: '10px',
                      minWidth: 20,
                      height: 20,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      px: 0.5
                    }}
                  >
                    <Typography
                      sx={{
                        color: 'white',
                        fontSize: '13px',
                        fontWeight: 600,
                        fontFamily: '-apple-system, SF Pro Display'
                      }}
                    >
                      {conversation.unreadCount}
                    </Typography>
                  </Box>
                )}
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default MessagesList;