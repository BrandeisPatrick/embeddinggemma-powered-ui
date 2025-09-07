import React from 'react';
import { Box, Typography } from '@mui/material';

function IOSTabBar({ activeApp, onAppChange }) {
  const tabs = [
    {
      id: 'messages',
      name: 'Messages',
      icon: '💬'
    },
    {
      id: 'mail',
      name: 'Mail',
      icon: '✉️'
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
            onClick={() => onAppChange(tab.id)}
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
                fontSize: '28px',
                marginBottom: 0.5,
                filter: activeApp === tab.id ? 'none' : 'grayscale(100%) brightness(0.6)'
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