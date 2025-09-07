import React from 'react';
import {
  Box,
  Typography,
  LinearProgress,
  Divider
} from '@mui/material';

function ResourceMonitor({ resources }) {
  if (!resources || !resources.model) {
    return (
      <Box sx={{ height: '100vh', p: 3, display: 'flex', flexDirection: 'column' }}>
        <Typography variant="subtitle2" sx={{ color: '#495057', mb: 3, fontWeight: 600 }}>
          Resource Monitor
        </Typography>
        <Box sx={{ 
          flex: 1, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          color: '#6c757d'
        }}>
          <Typography variant="caption">
            Initializing...
          </Typography>
        </Box>
      </Box>
    );
  }

  const { model } = resources;

  // Simple color coding for progress bars
  const getColor = (percentage) => {
    const value = parseFloat(percentage) || 0;
    if (value < 10) return '#28a745'; // Green
    if (value < 25) return '#ffc107'; // Yellow
    return '#dc3545'; // Red
  };

  const CircularResourceCard = ({ title, value, unit, percentage, subtitle, isActive, color }) => {
    const radius = 35;
    const strokeWidth = 4;
    const normalizedRadius = radius - strokeWidth * 2;
    const circumference = normalizedRadius * 2 * Math.PI;
    const strokeDashoffset = circumference - (parseFloat(percentage) / 100) * circumference;
    
    return (
      <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
        {/* Circular Progress */}
        <Box sx={{ position: 'relative', flexShrink: 0 }}>
          <svg width="80" height="80">
            <defs>
              <linearGradient id={`light-gradient-${title.replace(/\s+/g, '-')}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={color} />
                <stop offset="100%" stopColor={color + '80'} />
              </linearGradient>
            </defs>
            
            {/* Background circle */}
            <circle
              cx="40"
              cy="40"
              r={normalizedRadius}
              stroke="#e9ecef"
              strokeWidth={strokeWidth}
              fill="transparent"
            />
            
            {/* Progress circle */}
            <circle
              cx="40"
              cy="40"
              r={normalizedRadius}
              stroke={`url(#light-gradient-${title.replace(/\s+/g, '-')})`}
              strokeWidth={strokeWidth}
              fill="transparent"
              strokeDasharray={`${circumference} ${circumference}`}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              transform="rotate(-90 40 40)"
              sx={{
                transition: 'all 0.6s ease-out',
                opacity: 0.9
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
                color: '#212529',
                fontSize: '12px',
                fontWeight: 'bold',
                lineHeight: 1
              }}
            >
              {value}
            </Typography>
            <Typography
              sx={{
                color: '#6c757d',
                fontSize: '8px',
                fontWeight: 500
              }}
            >
              {unit}
            </Typography>
          </Box>
        </Box>

        {/* Text Content */}
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography variant="caption" sx={{ color: '#6c757d', fontSize: '0.7rem', fontWeight: 500, display: 'block' }}>
            {title}
          </Typography>
          <Typography variant="caption" sx={{ color: '#adb5bd', fontSize: '0.65rem', mt: 0.5, display: 'block' }}>
            {subtitle}
          </Typography>
          
          {isActive && (
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              mt: 1,
              p: 0.5,
              px: 1,
              backgroundColor: '#e3f2fd',
              borderRadius: 2,
              border: '1px solid #bbdefb',
              width: 'fit-content'
            }}>
              <Box sx={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                backgroundColor: '#2196f3',
                mr: 1,
                animation: 'pulse 1.5s infinite',
                '@keyframes pulse': {
                  '0%': { opacity: 1 },
                  '50%': { opacity: 0.5 },
                  '100%': { opacity: 1 }
                }
              }} />
              <Typography variant="caption" sx={{ color: '#1976d2', fontSize: '0.65rem', fontWeight: 500 }}>
                Processing
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    );
  };

  return (
    <Box sx={{ height: '100vh', p: 3, display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle2" sx={{ color: '#495057', fontWeight: 600, mb: 1 }}>
          Resource Monitor
        </Typography>
        <Typography variant="caption" sx={{ color: '#6c757d', fontSize: '0.7rem' }}>
          Embedding Gemma 300M
        </Typography>
      </Box>

      <Divider sx={{ mb: 3, borderColor: '#e9ecef' }} />

      {/* Resource Cards */}
      <Box sx={{ flex: 1 }}>
        <CircularResourceCard
          title="CPU Usage"
          value={model.iphonePercentages?.cpu || '0.00'}
          unit="% iPhone"
          percentage={model.iphonePercentages?.cpu || 0}
          subtitle={`${model.cpu}% absolute • A16 Bionic`}
          isActive={model.isActive}
          color="#007AFF"
        />

        <CircularResourceCard
          title="Memory Usage"
          value={model.iphonePercentages?.memory || '0.00'}
          unit="% iPhone"
          percentage={model.iphonePercentages?.memory || 0}
          subtitle={`${model.memory} MB • 4GB available`}
          isActive={parseFloat(model.iphonePercentages?.memory || 0) > 50}
          color="#34C759"
        />

        <CircularResourceCard
          title="GPU Usage"
          value={model.iphonePercentages?.gpu || '0'}
          unit="% iPhone"
          percentage={model.iphonePercentages?.gpu || 0}
          subtitle={model.gpu > 0 ? `${model.gpu}% absolute • 5-core GPU` : 'CPU mode only'}
          isActive={parseFloat(model.iphonePercentages?.gpu || 0) > 0}
          color="#FF9500"
        />

        <CircularResourceCard
          title="Neural Memory"
          value={model.iphonePercentages?.vram || model.iphonePercentages?.memory || '0.00'}
          unit="% unified"
          percentage={model.iphonePercentages?.vram || model.iphonePercentages?.memory || 0}
          subtitle={`${model.vram || model.memory} MB • Unified architecture`}
          isActive={parseFloat(model.iphonePercentages?.vram || model.iphonePercentages?.memory || 0) > 25}
          color="#FF375F"
        />
      </Box>

      {/* Footer */}
      <Box sx={{ 
        pt: 2,
        borderTop: '1px solid #e9ecef',
        textAlign: 'center'
      }}>
        <Typography variant="caption" sx={{ color: '#adb5bd', fontSize: '0.65rem' }}>
          {model.isActive ? 'Model actively processing' : 'Model ready for inference'}
        </Typography>
      </Box>
    </Box>
  );
}

export default ResourceMonitor;