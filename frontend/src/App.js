import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import io from 'socket.io-client';
import IPhoneEmulator from './IPhoneEmulator';
import ResourceDashboard from './ResourceDashboard';
import './App.css';

const socket = io('http://localhost:5001');

function App() {
  const [systemResources, setSystemResources] = useState(null);

  useEffect(() => {
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