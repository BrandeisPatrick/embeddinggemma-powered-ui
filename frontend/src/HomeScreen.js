import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import MessageIcon from './icons/MessageIcon';
import MailIcon from './icons/MailIcon';
import { SettingsIcon, CameraIcon, PhotosIcon, CalendarIcon, ClockIcon, WeatherIcon } from './icons/AppIcon';

function HomeScreen({ onAppLaunch }) {
  const [pressedApp, setPressedApp] = useState(null);

  const handleAppPress = (appId, event) => {
    event.preventDefault();
    
    // Only launch functional apps (messages, mail)
    if (appId === 'messages' || appId === 'mail') {
      setPressedApp(appId);
      
      // Simulate press animation with app launch
      setTimeout(() => {
        setPressedApp(null);
        onAppLaunch(appId);
      }, 150);
    } else {
      // For non-functional apps, just show press animation
      setPressedApp(appId);
      setTimeout(() => {
        setPressedApp(null);
      }, 150);
    }
  };

  const apps = [
    {
      id: 'messages',
      name: 'Messages',
      icon: <MessageIcon size={60} active={pressedApp === 'messages'} />,
      row: 0,
      col: 0
    },
    {
      id: 'mail',
      name: 'Mail', 
      icon: <MailIcon size={60} active={pressedApp === 'mail'} />,
      row: 0,
      col: 1
    },
    {
      id: 'settings',
      name: 'Settings',
      icon: <SettingsIcon size={60} active={pressedApp === 'settings'} />,
      row: 0,
      col: 2
    },
    {
      id: 'camera',
      name: 'Camera',
      icon: <CameraIcon size={60} active={pressedApp === 'camera'} />,
      row: 0,
      col: 3
    },
    {
      id: 'photos',
      name: 'Photos',
      icon: <PhotosIcon size={60} active={pressedApp === 'photos'} />,
      row: 1,
      col: 0
    },
    {
      id: 'calendar',
      name: 'Calendar',
      icon: <CalendarIcon size={60} active={pressedApp === 'calendar'} />,
      row: 1,
      col: 1
    },
    {
      id: 'clock',
      name: 'Clock',
      icon: <ClockIcon size={60} active={pressedApp === 'clock'} />,
      row: 1,
      col: 2
    },
    {
      id: 'weather',
      name: 'Weather',
      icon: <WeatherIcon size={60} active={pressedApp === 'weather'} />,
      row: 1,
      col: 3
    }
  ];

  return (
    <Box
      sx={{
        height: '100%',
        background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Background pattern overlay */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(circle at 20% 20%, rgba(255,255,255,0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(255,255,255,0.1) 0%, transparent 50%),
            radial-gradient(circle at 40% 60%, rgba(255,255,255,0.05) 0%, transparent 30%)
          `,
          opacity: 0.8
        }}
      />

      {/* Status bar space */}
      <Box sx={{ height: 44 }} />

      {/* App grid container */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gridTemplateRows: 'repeat(6, 1fr)',
          gap: 3,
          px: 3,
          py: 2,
          height: 'calc(100% - 44px - 83px)', // Subtract status bar and tab bar
          alignContent: 'start'
        }}
      >
        {apps.map((app) => (
          <Box
            key={app.id}
            onClick={(e) => handleAppPress(app.id, e)}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 1,
              cursor: 'pointer',
              userSelect: 'none',
              transition: 'transform 0.1s ease',
              transform: pressedApp === app.id ? 'scale(0.95)' : 'scale(1)',
              '&:active': {
                transform: 'scale(0.9)'
              }
            }}
          >
            {/* App icon */}
            <Box
              sx={{
                transition: 'all 0.1s ease',
                filter: pressedApp === app.id ? 'brightness(0.9)' : 'brightness(1)'
              }}
            >
              {app.icon}
            </Box>

            {/* App name */}
            <Typography
              sx={{
                color: 'white',
                fontSize: '12px',
                fontWeight: 400,
                fontFamily: '-apple-system, SF Pro Display, system-ui, sans-serif',
                textAlign: 'center',
                textShadow: '0 1px 2px rgba(0,0,0,0.5)',
                maxWidth: '70px',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
              }}
            >
              {app.name}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* Dock background blur */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 83,
          left: 0,
          right: 0,
          height: 100,
          background: 'rgba(255,255,255,0.1)',
          backdropFilter: 'blur(20px)',
          borderTop: '0.5px solid rgba(255,255,255,0.2)'
        }}
      />
    </Box>
  );
}

export default HomeScreen;