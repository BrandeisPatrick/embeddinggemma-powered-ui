import React from 'react';
import { Box, Typography } from '@mui/material';

function ResourceDashboard({ resources }) {
  if (!resources || !resources.model) {
    return (
      <Box
        sx={{
          height: '100vh',
          backgroundColor: '#0a0a0a',
          padding: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Box
          sx={{
            width: 60,
            height: 60,
            borderRadius: '50%',
            border: '2px solid #333333',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mb: 3,
            animation: 'pulse 2s infinite',
            '@keyframes pulse': {
              '0%': { opacity: 0.6 },
              '50%': { opacity: 1 },
              '100%': { opacity: 0.6 }
            }
          }}
        >
          <Typography sx={{ color: '#666666', fontSize: '24px' }}>🧠</Typography>
        </Box>
        <Typography
          sx={{
            color: '#666666',
            fontSize: '14px',
            fontWeight: 500,
            textAlign: 'center'
          }}
        >
          Initializing<br />Embedding Gemma
        </Typography>
      </Box>
    );
  }

  const { model } = resources;

  const CircularProgress = ({ percentage, title, value, unit, color, isActive }) => {
    const radius = 40;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (parseFloat(percentage) / 100) * circumference;

    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mb: 2
        }}
      >
        <Box sx={{ position: 'relative', mb: 1.5 }}>
          <svg width="100" height="100">
            <circle
              cx="50"
              cy="50"
              r={radius}
              stroke="#1a1a1a"
              strokeWidth="5"
              fill="transparent"
            />
            <circle
              cx="50"
              cy="50"
              r={radius}
              stroke={isActive ? color : '#333333'}
              strokeWidth="5"
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              transform="rotate(-90 50 50)"
              sx={{
                transition: 'all 0.5s ease',
                filter: isActive ? `drop-shadow(0 0 8px ${color}40)` : 'none'
              }}
            />
          </svg>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              textAlign: 'center'
            }}
          >
            <Typography
              sx={{
                color: '#FFFFFF',
                fontSize: '16px',
                fontWeight: 'bold',
                lineHeight: 1
              }}
            >
              {value}
            </Typography>
            <Typography
              sx={{
                color: '#666666',
                fontSize: '10px',
                fontWeight: 500
              }}
            >
              {unit}
            </Typography>
          </Box>
        </Box>
        
        <Typography
          sx={{
            color: '#CCCCCC',
            fontSize: '12px',
            fontWeight: 600,
            textAlign: 'center',
            mb: 1
          }}
        >
          {title}
        </Typography>
        
        {isActive && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: 'rgba(0, 122, 255, 0.1)',
              paddingX: 2,
              paddingY: 0.5,
              borderRadius: 3,
              border: '1px solid rgba(0, 122, 255, 0.3)'
            }}
          >
            <Box
              sx={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                backgroundColor: '#007AFF',
                mr: 1,
                animation: 'pulse 1s infinite',
                '@keyframes pulse': {
                  '0%': { opacity: 1 },
                  '50%': { opacity: 0.5 },
                  '100%': { opacity: 1 }
                }
              }}
            />
            <Typography
              sx={{
                color: '#007AFF',
                fontSize: '11px',
                fontWeight: 600
              }}
            >
              ACTIVE
            </Typography>
          </Box>
        )}
      </Box>
    );
  };

  return (
    <Box
      sx={{
        height: '844px',
        backgroundColor: '#0a0a0a',
        padding: 3,
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {/* Header */}
      <Box sx={{ mb: 3, textAlign: 'center' }}>
        <Typography
          sx={{
            color: '#FFFFFF',
            fontSize: '20px',
            fontWeight: 'bold',
            mb: 1
          }}
        >
          Resource Monitor
        </Typography>
        <Typography
          sx={{
            color: '#666666',
            fontSize: '12px',
            fontWeight: 500
          }}
        >
          Embedding Gemma 300M
        </Typography>
        <Box
          sx={{
            width: 30,
            height: 2,
            backgroundColor: '#333333',
            mx: 'auto',
            mt: 1.5,
            borderRadius: 1
          }}
        />
      </Box>

      {/* Resource Circles */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 3,
          justifyItems: 'center',
          px: 2
        }}
      >
        <CircularProgress
          percentage={model.iphonePercentages?.cpu || 0}
          title="CPU Usage"
          value={model.iphonePercentages?.cpu || '0.00'}
          unit="% iPhone"
          color="#007AFF"
          isActive={model.isActive}
        />

        <CircularProgress
          percentage={model.iphonePercentages?.memory || 0}
          title="Memory Usage"
          value={model.iphonePercentages?.memory || '0.00'}
          unit="% iPhone"
          color="#34C759"
          isActive={false}
        />

        <CircularProgress
          percentage={model.iphonePercentages?.gpu || 0}
          title="GPU Usage"
          value={model.iphonePercentages?.gpu || '0'}
          unit="% iPhone"
          color="#FF9500"
          isActive={false}
        />

        <CircularProgress
          percentage={model.iphonePercentages?.vram || model.iphonePercentages?.memory || 0}
          title="Neural Memory"
          value={model.iphonePercentages?.vram || model.iphonePercentages?.memory || '0.00'}
          unit="% Unified"
          color="#FF375F"
          isActive={false}
        />
      </Box>

      {/* Footer Info */}
      <Box
        sx={{
          mt: 'auto',
          pt: 2,
          borderTop: '1px solid #333333',
          textAlign: 'center'
        }}
      >
        <Typography
          sx={{
            color: model.isActive ? '#34C759' : '#666666',
            fontSize: '11px',
            fontWeight: 600,
            mb: 1
          }}
        >
          {model.isActive ? 'MODEL PROCESSING' : 'MODEL READY'}
        </Typography>
        <Typography
          sx={{
            color: '#666666',
            fontSize: '10px',
            lineHeight: 1.3
          }}
        >
          Simulated on iPhone 15 Pro<br />
          A16 Bionic • 4GB RAM • Neural Engine
        </Typography>
      </Box>
    </Box>
  );
}

export default ResourceDashboard;