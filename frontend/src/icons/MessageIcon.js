import React from 'react';

const MessageIcon = ({ size = 60, active = false }) => {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: size * 0.225, // iOS superellipse approximation
        background: active 
          ? 'linear-gradient(135deg, #00D4AA 0%, #00A876 100%)'
          : 'linear-gradient(135deg, #34C759 0%, #30B350 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: active 
          ? '0 8px 25px rgba(0, 212, 170, 0.4), inset 0 1px 0 rgba(255,255,255,0.2)'
          : '0 8px 25px rgba(52, 199, 89, 0.3), inset 0 1px 0 rgba(255,255,255,0.2)',
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
        width={size * 0.55}
        height={size * 0.55}
        viewBox="0 0 24 24"
        fill="none"
        style={{ zIndex: 1 }}
      >
        <path
          d="M12 2C17.5228 2 22 6.47715 22 12C22 13.8214 21.4428 15.5291 20.4667 16.9844C20.2593 17.3098 19.9634 17.5556 19.6181 17.6927C19.2728 17.8299 18.8929 17.8522 18.5333 17.7556L13.4 16.4C12.9467 16.2667 12.4533 16.2667 12 16.4L6.86667 17.7556C6.50714 17.8522 6.12721 17.8299 5.78191 17.6927C5.43661 17.5556 5.14067 17.3098 4.93333 16.9844C3.95722 15.5291 3.4 13.8214 3.4 12C3.4 6.47715 7.87715 2 13.4 2H12Z"
          fill="white"
          stroke="white"
          strokeWidth="0.5"
        />
        <circle cx="8.5" cy="12" r="1.5" fill="rgba(52, 199, 89, 0.8)" />
        <circle cx="12" cy="12" r="1.5" fill="rgba(52, 199, 89, 0.8)" />
        <circle cx="15.5" cy="12" r="1.5" fill="rgba(52, 199, 89, 0.8)" />
      </svg>
    </div>
  );
};

export default MessageIcon;