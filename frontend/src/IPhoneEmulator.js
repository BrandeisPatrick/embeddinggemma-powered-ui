import React, { useState } from 'react';
import { Box } from '@mui/material';
import IOSStatusBar from './IOSStatusBar';
import IOSTabBar from './IOSTabBar';
import IMessageApp from './IMessageApp';
import GmailApp from './GmailApp';

function IPhoneEmulator({ systemResources }) {
  const [activeApp, setActiveApp] = useState('messages');

  const renderActiveApp = () => {
    switch (activeApp) {
      case 'messages':
        return <IMessageApp systemResources={systemResources} />;
      case 'mail':
        return <GmailApp />;
      default:
        return <IMessageApp systemResources={systemResources} />;
    }
  };

  return (
    <Box
      sx={{
        width: 390,
        height: 844,
        backgroundColor: '#000000',
        borderRadius: 6,
        padding: '4px',
        boxShadow: '0 0 50px rgba(0,0,0,0.8)',
        position: 'relative',
        border: '2px solid #1c1c1e'
      }}
    >
      {/* iPhone Screen */}
      <Box
        sx={{
          width: '100%',
          height: '100%',
          backgroundColor: '#000000',
          borderRadius: 4,
          overflow: 'hidden',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* Status Bar */}
        <IOSStatusBar />

        {/* App Content */}
        <Box sx={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
          {renderActiveApp()}
        </Box>

        {/* Tab Bar */}
        <IOSTabBar activeApp={activeApp} onAppChange={setActiveApp} />

        {/* Home Indicator */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 8,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 134,
            height: 5,
            backgroundColor: '#FFFFFF',
            borderRadius: 3,
            opacity: 0.6
          }}
        />
      </Box>

      {/* Side Buttons */}
      <Box
        sx={{
          position: 'absolute',
          left: -3,
          top: 120,
          width: 3,
          height: 32,
          backgroundColor: '#1c1c1e',
          borderRadius: '3px 0 0 3px'
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          left: -3,
          top: 160,
          width: 3,
          height: 32,
          backgroundColor: '#1c1c1e',
          borderRadius: '3px 0 0 3px'
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          right: -3,
          top: 140,
          width: 3,
          height: 48,
          backgroundColor: '#1c1c1e',
          borderRadius: '0 3px 3px 0'
        }}
      />
    </Box>
  );
}

export default IPhoneEmulator;