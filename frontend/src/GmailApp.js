import React, { useState } from 'react';
import { Box, Typography, IconButton, Fab } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import CreateIcon from '@mui/icons-material/Create';
import StarBorderIcon from '@mui/icons-material/StarBorder';

function GmailApp() {
  const [selectedTab, setSelectedTab] = useState('Primary');

  const emails = [
    {
      id: 1,
      sender: 'GitHub',
      subject: '[Claude-Code] New issue opened',
      preview: 'A new issue has been opened in your repository...',
      time: '2:30 PM',
      avatar: '#4285F4',
      avatarText: 'G',
      unread: true
    },
    {
      id: 2,
      sender: 'OpenAI',
      subject: 'API Usage Summary for December',
      preview: 'Your monthly API usage report is ready...',
      time: '1:15 PM',
      avatar: '#10A37F',
      avatarText: 'O',
      unread: true
    },
    {
      id: 3,
      sender: 'Apple Developer',
      subject: 'App Store Connect Update',
      preview: 'New features are now available in App Store Connect...',
      time: '11:45 AM',
      avatar: '#000000',
      avatarText: 'A',
      unread: false
    },
    {
      id: 4,
      sender: 'Anthropic',
      subject: 'Claude 3.5 Sonnet - New Capabilities',
      preview: 'Discover the enhanced reasoning and coding abilities...',
      time: '10:20 AM',
      avatar: '#D97706',
      avatarText: 'A',
      unread: false
    },
    {
      id: 5,
      sender: 'Google Cloud',
      subject: 'Billing Alert: Usage Approaching Limit',
      preview: 'Your current usage is at 85% of your monthly limit...',
      time: 'Yesterday',
      avatar: '#EA4335',
      avatarText: 'G',
      unread: false
    }
  ];

  const tabs = ['Primary', 'Social', 'Promotions'];

  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#000000'
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          padding: 2,
          paddingX: 3,
          borderBottom: '0.5px solid rgba(255, 255, 255, 0.1)'
        }}
      >
        <IconButton sx={{ color: '#FFFFFF', mr: 2 }}>
          <MenuIcon />
        </IconButton>
        <Box
          sx={{
            flex: 1,
            backgroundColor: '#1C1C1E',
            borderRadius: 5,
            display: 'flex',
            alignItems: 'center',
            paddingX: 2,
            paddingY: 1.5
          }}
        >
          <SearchIcon sx={{ color: '#8E8E93', mr: 2 }} />
          <Typography
            sx={{
              color: '#8E8E93',
              fontSize: '17px',
              fontFamily: 'Roboto, -apple-system'
            }}
          >
            Search in mail
          </Typography>
        </Box>
      </Box>

      {/* Category Tabs */}
      <Box
        sx={{
          display: 'flex',
          borderBottom: '0.5px solid rgba(255, 255, 255, 0.1)'
        }}
      >
        {tabs.map((tab) => (
          <Box
            key={tab}
            onClick={() => setSelectedTab(tab)}
            sx={{
              flex: 1,
              padding: 2,
              textAlign: 'center',
              cursor: 'pointer',
              borderBottom: selectedTab === tab ? '2px solid #EA4335' : 'none',
              backgroundColor: selectedTab === tab ? 'rgba(234, 67, 53, 0.1)' : 'transparent'
            }}
          >
            <Typography
              sx={{
                color: selectedTab === tab ? '#EA4335' : '#8E8E93',
                fontSize: '14px',
                fontWeight: selectedTab === tab ? 600 : 400,
                fontFamily: 'Roboto, -apple-system'
              }}
            >
              {tab}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* Email List */}
      <Box
        sx={{
          flex: 1,
          overflow: 'auto'
        }}
      >
        {emails.map((email) => (
          <Box
            key={email.id}
            sx={{
              display: 'flex',
              alignItems: 'center',
              padding: 2,
              paddingX: 3,
              borderBottom: '0.5px solid rgba(255, 255, 255, 0.05)',
              backgroundColor: email.unread ? 'rgba(255, 255, 255, 0.02)' : 'transparent',
              cursor: 'pointer',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.05)'
              }
            }}
          >
            {/* Avatar */}
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                backgroundColor: email.avatar,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mr: 3,
                flexShrink: 0
              }}
            >
              <Typography
                sx={{
                  color: '#FFFFFF',
                  fontSize: '16px',
                  fontWeight: 'bold'
                }}
              >
                {email.avatarText}
              </Typography>
            </Box>

            {/* Content */}
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  mb: 0.5
                }}
              >
                <Typography
                  sx={{
                    color: '#FFFFFF',
                    fontSize: '16px',
                    fontWeight: email.unread ? 600 : 400,
                    fontFamily: 'Roboto, -apple-system',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {email.sender}
                </Typography>
                <Typography
                  sx={{
                    color: '#8E8E93',
                    fontSize: '14px',
                    fontFamily: 'Roboto, -apple-system',
                    flexShrink: 0,
                    ml: 2
                  }}
                >
                  {email.time}
                </Typography>
              </Box>

              <Typography
                sx={{
                  color: email.unread ? '#FFFFFF' : '#8E8E93',
                  fontSize: '15px',
                  fontWeight: email.unread ? 500 : 400,
                  fontFamily: 'Roboto, -apple-system',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  mb: 0.5
                }}
              >
                {email.subject}
              </Typography>

              <Typography
                sx={{
                  color: '#8E8E93',
                  fontSize: '14px',
                  fontFamily: 'Roboto, -apple-system',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }}
              >
                {email.preview}
              </Typography>
            </Box>

            {/* Actions */}
            <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
              <IconButton size="small" sx={{ color: '#8E8E93' }}>
                <StarBorderIcon fontSize="small" />
              </IconButton>
            </Box>
          </Box>
        ))}
      </Box>

      {/* Compose FAB */}
      <Fab
        sx={{
          position: 'absolute',
          bottom: 100,
          right: 20,
          backgroundColor: '#EA4335',
          color: '#FFFFFF',
          width: 56,
          height: 56,
          '&:hover': {
            backgroundColor: '#D33B2C'
          }
        }}
      >
        <CreateIcon />
      </Fab>
    </Box>
  );
}

export default GmailApp;