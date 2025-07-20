import React from 'react';

const Logo = ({ size = 'default', className = '' }) => {
  const sizeClasses = {
    small: 'w-6 h-6',
    default: 'w-10 h-10',
    large: 'w-14 h-14'
  };

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      {/* SVG Logo */}
      <div className={`${sizeClasses[size]} bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center shadow-lg border border-primary-400/20`}>
        <svg 
          viewBox="0 0 32 32" 
          className="w-6 h-6 text-white"
          fill="currentColor"
        >
          {/* Modern P symbol with sleek design */}
          <g>
            {/* Main P shape - more modern proportions */}
            <path d="M6 6h12c3.3 0 6 2.7 6 6s-2.7 6-6 6h-8v10h-4V6zm4 4h8c1.1 0 2 .9 2 2s-.9 2-2 2h-8V10z" fill="currentColor"/>
            
            {/* Modern accent dot */}
            <circle cx="26" cy="8" r="2.5" fill="currentColor" opacity="0.9"/>
            
            {/* Subtle tech accent lines */}
            <line x1="4" y1="22" x2="28" y2="22" stroke="currentColor" strokeWidth="1.2" opacity="0.4"/>
            <line x1="4" y1="26" x2="22" y2="26" stroke="currentColor" strokeWidth="1.2" opacity="0.4"/>
          </g>
        </svg>
      </div>
      
      {/* Text */}
      <span className="text-2xl font-bold gradient-text tracking-wide">ProDone</span>
    </div>
  );
};

export default Logo; 