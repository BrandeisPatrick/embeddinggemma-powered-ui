import React from 'react';

const AppIcon = ({ size = 60, gradient, icon, active = false, name }) => {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: size * 0.225, // iOS superellipse approximation
        background: gradient,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: active 
          ? '0 8px 25px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.2)'
          : '0 8px 25px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.2)',
        transition: 'all 0.3s ease',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'pointer',
        transform: active ? 'scale(0.95)' : 'scale(1)'
      }}
    >
      {/* Highlight effect */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '40%',
          background: 'linear-gradient(to bottom, rgba(255,255,255,0.25), transparent)',
          borderRadius: `${size * 0.225}px ${size * 0.225}px 0 0`
        }}
      />
      
      <div style={{ zIndex: 1 }}>
        {icon}
      </div>
    </div>
  );
};

// Settings Icon
export const SettingsIcon = ({ size = 60, active = false }) => (
  <AppIcon 
    size={size} 
    active={active}
    gradient="linear-gradient(135deg, #8E8E93 0%, #6D6D70 100%)"
    icon={
      <svg width={size * 0.55} height={size * 0.55} viewBox="0 0 24 24" fill="white">
        <path d="M12 15.5A3.5 3.5 0 0 1 8.5 12A3.5 3.5 0 0 1 12 8.5a3.5 3.5 0 0 1 3.5 3.5a3.5 3.5 0 0 1-3.5 3.5m7.43-2.53c.04-.32.07-.64.07-.97c0-.33-.03-.66-.07-1l2.11-1.63c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.31-.61-.22l-2.49 1c-.52-.39-1.06-.73-1.69-.98l-.37-2.65A.506.506 0 0 0 14 2h-4c-.25 0-.46.18-.5.42l-.37 2.65c-.63.25-1.17.59-1.69.98l-2.49-1c-.22-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64L4.57 11c-.04.34-.07.67-.07 1c0 .33.03.65.07.97l-2.11 1.66c-.19.15-.25.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1.01c.52.4 1.06.74 1.69.99l.37 2.65c.04.24.25.42.5.42h4c.25 0 .46-.18.5-.42l.37-2.65c.63-.26 1.17-.59 1.69-.99l2.49 1.01c.22.08.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.66Z"/>
      </svg>
    }
  />
);

// Camera Icon
export const CameraIcon = ({ size = 60, active = false }) => (
  <AppIcon 
    size={size} 
    active={active}
    gradient="linear-gradient(135deg, #8E8E93 0%, #6D6D70 100%)"
    icon={
      <svg width={size * 0.55} height={size * 0.55} viewBox="0 0 24 24" fill="white">
        <path d="M4,4H7L9,2H15L17,4H20A2,2 0 0,1 22,6V18A2,2 0 0,1 20,20H4A2,2 0 0,1 2,18V6A2,2 0 0,1 4,4M12,7A5,5 0 0,0 7,12A5,5 0 0,0 12,17A5,5 0 0,0 17,12A5,5 0 0,0 12,7M12,9A3,3 0 0,1 15,12A3,3 0 0,1 12,15A3,3 0 0,1 9,12A3,3 0 0,1 12,9Z"/>
      </svg>
    }
  />
);

// Photos Icon
export const PhotosIcon = ({ size = 60, active = false }) => (
  <AppIcon 
    size={size} 
    active={active}
    gradient="linear-gradient(135deg, #FF9500 0%, #FF6B00 100%)"
    icon={
      <svg width={size * 0.55} height={size * 0.55} viewBox="0 0 24 24" fill="white">
        <path d="M8.5,13.5L11,16.5L14.5,12L19,18H5M21,19V5C21,3.89 20.1,3 19,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19Z"/>
      </svg>
    }
  />
);

// Calendar Icon
export const CalendarIcon = ({ size = 60, active = false }) => (
  <AppIcon 
    size={size} 
    active={active}
    gradient="linear-gradient(135deg, #FF3B30 0%, #D70015 100%)"
    icon={
      <svg width={size * 0.55} height={size * 0.55} viewBox="0 0 24 24" fill="white">
        <path d="M19,19H5V8H19M16,1V3H8V1H6V3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3H18V1M17,12H12V17H17V12Z"/>
      </svg>
    }
  />
);

// Clock Icon
export const ClockIcon = ({ size = 60, active = false }) => (
  <AppIcon 
    size={size} 
    active={active}
    gradient="linear-gradient(135deg, #000000 0%, #1C1C1E 100%)"
    icon={
      <svg width={size * 0.55} height={size * 0.55} viewBox="0 0 24 24" fill="white">
        <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M16.2,16.2L11,13V7H12.5V12.2L17,14.7L16.2,16.2Z"/>
      </svg>
    }
  />
);

// Weather Icon
export const WeatherIcon = ({ size = 60, active = false }) => (
  <AppIcon 
    size={size} 
    active={active}
    gradient="linear-gradient(135deg, #5AC8FA 0%, #007AFF 100%)"
    icon={
      <svg width={size * 0.55} height={size * 0.55} viewBox="0 0 24 24" fill="white">
        <path d="M12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,2L14.39,5.42C13.65,5.15 12.84,5 12,5C11.16,5 10.35,5.15 9.61,5.42L12,2M3.34,7L6.76,6.76C6.38,7.53 6.1,8.37 6,9.24L3.34,7M3.34,17L6,15.76C6.1,16.64 6.38,17.47 6.76,18.24L3.34,17M12,22L9.61,18.58C10.35,18.85 11.16,19 12,19C12.84,19 13.65,18.85 14.39,18.58L12,22M20.66,17L18,18.24C18.62,17.47 18.9,16.64 19,15.76L20.66,17M20.66,7L19,9.24C18.9,8.37 18.62,7.53 18,6.76L20.66,7Z"/>
      </svg>
    }
  />
);

export default AppIcon;