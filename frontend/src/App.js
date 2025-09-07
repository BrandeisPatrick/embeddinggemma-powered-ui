import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import io from 'socket.io-client';
import IPhoneEmulator from './IPhoneEmulator';
import ResourceDashboard from './ResourceDashboard';
import './App.css';

// For Vercel deployment, use conditional socket connection
const socket = typeof window !== 'undefined' && window.location.hostname === 'localhost'
  ? io('http://localhost:5001')
  : null;

function App() {
  const [systemResources, setSystemResources] = useState(null);

  useEffect(() => {
    if (!socket) {
      // Demo system resources for Vercel deployment
      setSystemResources({
        model: {
          cpu: 12.5,
          memory: 512,
          gpu: 0,
          vram: 0,
          isActive: false,
          iphonePercentages: {
            cpu: '15.6',
            memory: '12.8',
            gpu: '0',
            vram: '12.8'
          }
        }
      });
      return;
    }

    socket.on('systemResources', (resources) => {
      setSystemResources(resources);
    });

    return () => {
      socket.off('systemResources');
    };
  }, []);

  return (
    <Box
      sx={{
        height: '100vh',
        backgroundColor: '#000000',
        display: 'grid',
        gridTemplateColumns: '400px 360px',
        gap: 3,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 2
      }}
    >
      {/* iPhone Emulator */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <IPhoneEmulator systemResources={systemResources} />
      </Box>

      {/* Resource Dashboard */}
      <Box
        sx={{
          width: 360,
          height: 844,
          backgroundColor: '#0a0a0a',
          borderRadius: 4,
          border: '1px solid #1a1a1a',
          boxShadow: '0 0 30px rgba(0,0,0,0.8)'
        }}
      >
        <ResourceDashboard resources={systemResources} />
      </Box>
    </Box>
  );
}

export default App;