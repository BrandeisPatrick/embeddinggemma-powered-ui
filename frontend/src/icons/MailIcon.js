import React from 'react';

const MailIcon = ({ size = 60, active = false }) => {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: size * 0.225, // iOS superellipse approximation
        background: active 
          ? 'linear-gradient(135deg, #5AC8FA 0%, #007AFF 100%)'
          : 'linear-gradient(135deg, #007AFF 0%, #0056CC 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: active 
          ? '0 8px 25px rgba(90, 200, 250, 0.4), inset 0 1px 0 rgba(255,255,255,0.2)'
          : '0 8px 25px rgba(0, 122, 255, 0.3), inset 0 1px 0 rgba(255,255,255,0.2)',
        transition: 'all 0.3s ease',
        position: 'relative',
        overflow: 'hidden'
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
      
      <svg
        width={size * 0.6}
        height={size * 0.6}
        viewBox="0 0 24 24"
        fill="none"
        style={{ zIndex: 1 }}
      >
        {/* Envelope body */}
        <rect
          x="3"
          y="6"
          width="18"
          height="12"
          rx="2"
          ry="2"
          fill="white"
          stroke="white"
          strokeWidth="0.5"
        />
        
        {/* Envelope flap */}
        <path
          d="M3 8L12 13L21 8"
          stroke="rgba(0, 122, 255, 0.8)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        
        {/* Inner shadow on envelope */}
        <path
          d="M3 8L12 13L21 8V6C21 4.89543 20.1046 4 19 4H5C3.89543 4 3 4.89543 3 6V8Z"
          fill="rgba(0, 122, 255, 0.1)"
        />
      </svg>
    </div>
  );
};

export default MailIcon;