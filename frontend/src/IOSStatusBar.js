import React from 'react';
import { Box, Typography } from '@mui/material';

function IOSStatusBar() {
  const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <Box
      sx={{
        height: 47,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingX: 3,
        paddingTop: 1,
        position: 'relative'
      }}
    >
      {/* Notch */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 126,
          height: 30,
          backgroundColor: '#000000',
          borderRadius: '0 0 20px 20px',
          zIndex: 10
        }}
      />

      {/* Left side - Time */}
      <Typography
        sx={{
          color: '#FFFFFF',
          fontSize: '17px',
          fontWeight: 600,
          fontFamily: '-apple-system, SF Pro Display'
        }}
      >
        {currentTime}
      </Typography>

      {/* Right side - Battery, WiFi, Cellular */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        {/* Cellular */}
        <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: '1px' }}>
          {[1, 2, 3, 4].map((bar) => (
            <Box
              key={bar}
              sx={{
                width: 3,
                height: bar * 2 + 2,
                backgroundColor: '#FFFFFF',
                borderRadius: 0.5
              }}
            />
          ))}
        </Box>

        {/* WiFi */}
        <Box
          sx={{
            width: 17,
            height: 17,
            position: 'relative'
          }}
        >
          <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
            <path
              d="M8.5 2C11.9 2 14.9 3.4 17 5.7L15.5 7.3C13.8 5.7 11.3 4.8 8.5 4.8C5.7 4.8 3.2 5.7 1.5 7.3L0 5.7C2.1 3.4 5.1 2 8.5 2Z"
              fill="#FFFFFF"
            />
            <path
              d="M8.5 6.5C10.7 6.5 12.7 7.3 14.2 8.6L12.7 10.2C11.6 9.3 10.1 8.8 8.5 8.8C6.9 8.8 5.4 9.3 4.3 10.2L2.8 8.6C4.3 7.3 6.3 6.5 8.5 6.5Z"
              fill="#FFFFFF"
            />
            <circle cx="8.5" cy="13.5" r="1.5" fill="#FFFFFF"/>
          </svg>
        </Box>

        {/* Battery */}
        <Box
          sx={{
            width: 24,
            height: 13,
            border: '1px solid #FFFFFF',
            borderRadius: 2.5,
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            paddingX: 0.5
          }}
        >
          <Box
            sx={{
              width: '85%',
              height: '70%',
              backgroundColor: '#34C759',
              borderRadius: 1
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              right: -3,
              width: 2,
              height: 8,
              backgroundColor: '#FFFFFF',
              borderRadius: '0 1px 1px 0'
            }}
          />
        </Box>
      </Box>
    </Box>
  );
}

export default IOSStatusBar;