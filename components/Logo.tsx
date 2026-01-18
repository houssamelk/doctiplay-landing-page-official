import React from 'react';

interface LogoProps {
  className?: string;
  showPulse?: boolean;
}

const Logo: React.FC<LogoProps> = ({ className = "w-24 h-12", showPulse = true }) => {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 240 100"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full filter drop-shadow-[0_0_15px_rgba(0,216,255,0.9)]"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <filter id="neon-glow-thick" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2.5" result="blur1" />
            <feGaussianBlur stdDeviation="5" result="blur2" />
            <feMerge>
              <feMergeNode in="blur2" />
              <feMergeNode in="blur1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          
          <linearGradient id="neon-grad-main" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00d8ff" stopOpacity="0" />
            <stop offset="10%" stopColor="#00d8ff" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#00d8ff" stopOpacity="1" />
            <stop offset="90%" stopColor="#00d8ff" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#00d8ff" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Thick, sharp symmetrical pulse waves (ECG) */}
        {showPulse && (
          <path
            d="M5,50 L55,50 L65,50 L70,25 L75,75 L80,50 L100,50 M140,50 L160,50 L165,25 L170,75 L175,50 L235,50"
            fill="none"
            stroke="url(#neon-grad-main)"
            strokeWidth="5"
            strokeLinecap="square"
            filter="url(#neon-glow-thick)"
            className="opacity-100"
          >
            <animate 
              attributeName="stroke-dasharray" 
              from="0,1000" 
              to="1000,0" 
              dur="3s" 
              repeatCount="indefinite" 
            />
          </path>
        )}

        {/* Central Geometric Icon (D-Play Button Integrated) */}
        <g transform="translate(90, 15) scale(0.7)">
          {/* Sharp, futuristic geometric 'D' */}
          <path
            d="M5,0 L50,0 C75,0 95,20 95,50 C95,80 75,100 50,100 L5,100 L0,95 V5 L5,0 Z"
            fill="none"
            stroke="#00d8ff"
            strokeWidth="8"
            strokeLinejoin="miter"
            filter="url(#neon-glow-thick)"
          />
          {/* Thick Play Triangle */}
          <path
            d="M35,30 L70,50 L35,70 Z"
            fill="#00d8ff"
            filter="url(#neon-glow-thick)"
          />
        </g>
      </svg>
    </div>
  );
};

export default Logo;