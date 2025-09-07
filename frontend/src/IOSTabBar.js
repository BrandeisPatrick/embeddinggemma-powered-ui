import React from 'react';
import { Box, Typography } from '@mui/material';

function IOSTabBar({ activeApp, onAppChange, onHomePress }) {
  // Home Icon Component
  const HomeIcon = ({ active = false, size = 24 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={active ? '#007AFF' : '#8E8E93'}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
    </svg>
  );

  // Messages Icon Component (smaller for tab bar)
  const MessagesTabIcon = ({ active = false, size = 24 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={active ? '#007AFF' : '#8E8E93'}>
      <path d="M12 2C17.5228 2 22 6.47715 22 12C22 13.8214 21.4428 15.5291 20.4667 16.9844C20.2593 17.3098 19.9634 17.5556 19.6181 17.6927C19.2728 17.8299 18.8929 17.8522 18.5333 17.7556L13.4 16.4C12.9467 16.2667 12.4533 16.2667 12 16.4L6.86667 17.7556C6.50714 17.8522 6.12721 17.8299 5.78191 17.6927C5.43661 17.5556 5.14067 17.3098 4.93333 16.9844C3.95722 15.5291 3.4 13.8214 3.4 12C3.4 6.47715 7.87715 2 13.4 2H12Z"/>
    </svg>
  );

  // Mail Icon Component (smaller for tab bar)
  const MailTabIcon = ({ active = false, size = 24 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={active ? '#007AFF' : '#8E8E93'}>
      <path d="M20 4H4C2.9 4 2.01 4.9 2.01 6L2 18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 8L12 13L4 8V6L12 11L20 6V8Z"/>
    </svg>
  );

  const tabs = [
    {
      id: 'home',
      name: 'Home',
      icon: <HomeIcon active={activeApp === 'home'} />,
      onPress: onHomePress
    },
    {
      id: 'messages',
      name: 'Messages',
      icon: <MessagesTabIcon active={activeApp === 'messages'} />
    },
    {
      id: 'mail',
      name: 'Mail',
      icon: <MailTabIcon active={activeApp === 'mail'} />
    }
  ];

  return (
    <Box
      sx={{
        height: 83,
        backgroundColor: 'rgba(28, 28, 30, 0.95)',
        backdropFilter: 'blur(20px)',
        borderTop: '0.5px solid rgba(255, 255, 255, 0.1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 2,
        paddingTop: 1
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          gap: 8,
          width: '100%'
        }}
      >
        {tabs.map((tab) => (
          <Box
            key={tab.id}
            onClick={() => tab.onPress ? tab.onPress() : onAppChange(tab.id)}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              '&:active': {
                transform: 'scale(0.95)'
              }
            }}
          >
            <Box
              sx={{
                marginBottom: 0.5,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: 28,
                opacity: activeApp === tab.id ? 1 : 0.6
              }}
            >
              {tab.icon}
            </Box>
            <Typography
              sx={{
                color: activeApp === tab.id ? '#007AFF' : '#8E8E93',
                fontSize: '10px',
                fontWeight: 500,
                fontFamily: '-apple-system, SF Pro Display'
              }}
            >
              {tab.name}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default IOSTabBar;