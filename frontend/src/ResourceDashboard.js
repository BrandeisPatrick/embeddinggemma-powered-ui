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
    const radius = 42;
    const strokeWidth = 6;
    const normalizedRadius = radius - strokeWidth * 2;
    const circumference = normalizedRadius * 2 * Math.PI;
    const strokeDashoffset = circumference - (parseFloat(percentage) / 100) * circumference;
    
    // Create gradient colors based on the main color
    const gradientId = `gradient-${title.replace(/\s+/g, '-').toLowerCase()}`;
    const glowId = `glow-${title.replace(/\s+/g, '-').toLowerCase()}`;
    
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
          <svg width="110" height="110" style={{ overflow: 'visible' }}>
            <defs>
              <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={color} />
                <stop offset="100%" stopColor={color.replace('FF', 'AA')} />
              </linearGradient>
              <filter id={glowId}>
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge> 
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/> 
                </feMerge>
              </filter>
              <pattern id={`pattern-${title.replace(/\s+/g, '-').toLowerCase()}`} x="0" y="0" width="4" height="4" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="0.5" fill="rgba(255,255,255,0.03)" />
              </pattern>
            </defs>
            
            {/* Background circle with pattern */}
            <circle
              cx="55"
              cy="55"
              r={normalizedRadius}
              fill={`url(#pattern-${title.replace(/\s+/g, '-').toLowerCase()})`}
              stroke="#1a1a1a"
              strokeWidth={strokeWidth}
            />
            
            {/* Progress circle */}
            <circle
              cx="55"
              cy="55"
              r={normalizedRadius}
              stroke={isActive ? `url(#${gradientId})` : '#333333'}
              strokeWidth={strokeWidth}
              fill="transparent"
              strokeDasharray={`${circumference} ${circumference}`}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              transform="rotate(-90 55 55)"
              filter={isActive && parseFloat(percentage) > 10 ? `url(#${glowId})` : 'none'}
              sx={{
                transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                opacity: isActive ? 1 : 0.6
              }}
            />
            
            {/* Animated dot at the end of progress */}
            {isActive && parseFloat(percentage) > 5 && (
              <circle
                cx={55 + normalizedRadius * Math.cos((parseFloat(percentage) / 100) * 2 * Math.PI - Math.PI / 2)}
                cy={55 + normalizedRadius * Math.sin((parseFloat(percentage) / 100) * 2 * Math.PI - Math.PI / 2)}
                r="3"
                fill={color}
                sx={{
                  filter: `drop-shadow(0 0 6px ${color})`,
                  animation: 'pulse 2s infinite',
                  '@keyframes pulse': {
                    '0%': { opacity: 0.8, r: '2.5' },
                    '50%': { opacity: 1, r: '3.5' },
                    '100%': { opacity: 0.8, r: '2.5' }
                  }
                }}
              />
            )}
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
                fontSize: '18px',
                fontWeight: 'bold',
                lineHeight: 1,
                textShadow: isActive ? `0 0 10px ${color}40` : 'none',
                transition: 'all 0.3s ease'
              }}
            >
              {value}
            </Typography>
            <Typography
              sx={{
                color: '#999999',
                fontSize: '9px',
                fontWeight: 600,
                letterSpacing: '0.5px',
                textTransform: 'uppercase'
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
          isActive={parseFloat(model.iphonePercentages?.memory || 0) > 50}
        />

        <CircularProgress
          percentage={model.iphonePercentages?.gpu || 0}
          title="GPU Usage"
          value={model.iphonePercentages?.gpu || '0'}
          unit="% iPhone"
          color="#FF9500"
          isActive={parseFloat(model.iphonePercentages?.gpu || 0) > 0}
        />

        <CircularProgress
          percentage={model.iphonePercentages?.vram || model.iphonePercentages?.memory || 0}
          title="Neural Memory"
          value={model.iphonePercentages?.vram || model.iphonePercentages?.memory || '0.00'}
          unit="% Unified"
          color="#FF375F"
          isActive={parseFloat(model.iphonePercentages?.vram || model.iphonePercentages?.memory || 0) > 25}
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