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

  const ResourceCard = ({ title, value, unit, percentage, subtitle, isActive }) => (
    <Box sx={{ mb: 3 }}>
      <Typography variant="caption" sx={{ color: '#6c757d', fontSize: '0.7rem', fontWeight: 500 }}>
        {title}
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'baseline', mb: 1 }}>
        <Typography variant="h6" sx={{ fontWeight: 600, color: '#212529', mr: 1 }}>
          {value}
        </Typography>
        <Typography variant="caption" sx={{ color: '#adb5bd', fontSize: '0.75rem' }}>
          {unit}
        </Typography>
      </Box>
      <LinearProgress
        variant="determinate"
        value={Math.min(parseFloat(percentage) || 0, 100)}
        sx={{
          height: 6,
          borderRadius: 3,
          backgroundColor: '#f8f9fa',
          '& .MuiLinearProgress-bar': {
            backgroundColor: getColor(percentage),
            borderRadius: 3
          }
        }}
      />
      <Typography variant="caption" sx={{ color: '#adb5bd', fontSize: '0.65rem', mt: 0.5, display: 'block' }}>
        {subtitle}
      </Typography>
      {isActive && (
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          mt: 1,
          p: 1,
          backgroundColor: '#e3f2fd',
          borderRadius: 2,
          border: '1px solid #bbdefb'
        }}>
          <Box sx={{
            width: 8,
            height: 8,
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
          <Typography variant="caption" sx={{ color: '#1976d2', fontSize: '0.7rem', fontWeight: 500 }}>
            Processing
          </Typography>
        </Box>
      )}
    </Box>
  );

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
        <ResourceCard
          title="CPU Usage"
          value={model.iphonePercentages?.cpu || '0.00'}
          unit="% of iPhone"
          percentage={model.iphonePercentages?.cpu || 0}
          subtitle={`${model.cpu}% absolute • A16 Bionic`}
          isActive={model.isActive}
        />

        <ResourceCard
          title="Memory Usage"
          value={model.iphonePercentages?.memory || '0.00'}
          unit="% of iPhone"
          percentage={model.iphonePercentages?.memory || 0}
          subtitle={`${model.memory} MB • 4GB available`}
          isActive={false}
        />

        <ResourceCard
          title="GPU Usage"
          value={model.iphonePercentages?.gpu || '0'}
          unit="% of iPhone"
          percentage={model.iphonePercentages?.gpu || 0}
          subtitle={model.gpu > 0 ? `${model.gpu}% absolute • 5-core GPU` : 'CPU mode only'}
          isActive={false}
        />

        <ResourceCard
          title="Neural Memory"
          value={model.iphonePercentages?.vram || model.iphonePercentages?.memory || '0.00'}
          unit="% unified"
          percentage={model.iphonePercentages?.vram || model.iphonePercentages?.memory || 0}
          subtitle={`${model.vram || model.memory} MB • Unified architecture`}
          isActive={false}
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