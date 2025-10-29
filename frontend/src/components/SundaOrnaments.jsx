import React from 'react';

// Ornamen Sunda SVG Components
export const SundaOrnament1 = ({ className = "w-24 h-24", color = "#D97706" }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Motif Bunga Melati Sunda */}
    <circle cx="50" cy="50" r="8" fill={color} opacity="0.3" />
    <circle cx="50" cy="35" r="6" fill={color} opacity="0.5" />
    <circle cx="65" cy="50" r="6" fill={color} opacity="0.5" />
    <circle cx="50" cy="65" r="6" fill={color} opacity="0.5" />
    <circle cx="35" cy="50" r="6" fill={color} opacity="0.5" />
    <circle cx="60" cy="40" r="4" fill={color} opacity="0.4" />
    <circle cx="60" cy="60" r="4" fill={color} opacity="0.4" />
    <circle cx="40" cy="60" r="4" fill={color} opacity="0.4" />
    <circle cx="40" cy="40" r="4" fill={color} opacity="0.4" />
  </svg>
);

export const SundaOrnament2 = ({ className = "w-32 h-8", color = "#D97706" }) => (
  <svg className={className} viewBox="0 0 200 50" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Motif Garis Sunda */}
    <path d="M10 25 Q30 15, 50 25 T90 25 T130 25 T170 25 T190 25" stroke={color} strokeWidth="2" fill="none" opacity="0.6" />
    <circle cx="30" cy="25" r="3" fill={color} opacity="0.5" />
    <circle cx="70" cy="25" r="3" fill={color} opacity="0.5" />
    <circle cx="110" cy="25" r="3" fill={color} opacity="0.5" />
    <circle cx="150" cy="25" r="3" fill={color} opacity="0.5" />
  </svg>
);

export const SundaBatikPattern = ({ className = "absolute inset-0 opacity-5" }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern id="batik-sunda" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
        {/* Kawung Pattern - Motif Batik Sunda */}
        <circle cx="25" cy="25" r="15" fill="none" stroke="#8B4513" strokeWidth="0.5" />
        <circle cx="75" cy="25" r="15" fill="none" stroke="#8B4513" strokeWidth="0.5" />
        <circle cx="25" cy="75" r="15" fill="none" stroke="#8B4513" strokeWidth="0.5" />
        <circle cx="75" cy="75" r="15" fill="none" stroke="#8B4513" strokeWidth="0.5" />
        <circle cx="50" cy="50" r="15" fill="none" stroke="#8B4513" strokeWidth="0.5" />
        
        {/* Inner details */}
        <circle cx="25" cy="25" r="8" fill="none" stroke="#D97706" strokeWidth="0.3" />
        <circle cx="75" cy="25" r="8" fill="none" stroke="#D97706" strokeWidth="0.3" />
        <circle cx="25" cy="75" r="8" fill="none" stroke="#D97706" strokeWidth="0.3" />
        <circle cx="75" cy="75" r="8" fill="none" stroke="#D97706" strokeWidth="0.3" />
        <circle cx="50" cy="50" r="8" fill="none" stroke="#D97706" strokeWidth="0.3" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#batik-sunda)" />
  </svg>
);

export const SundaDivider = ({ className = "" }) => (
  <div className={`flex items-center justify-center gap-4 ${className}`}>
    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-amber-600 to-transparent opacity-30"></div>
    <div className="flex items-center gap-2">
      <SundaOrnament1 className="w-8 h-8" color="#D97706" />
      <div className="w-2 h-2 rounded-full bg-amber-600 opacity-50"></div>
      <SundaOrnament1 className="w-8 h-8" color="#D97706" />
    </div>
    <div className="flex-1 h-px bg-gradient-to-l from-transparent via-amber-600 to-transparent opacity-30"></div>
  </div>
);

export const SundaCornerOrnament = ({ position = "top-left", className = "" }) => {
  const positionClasses = {
    "top-left": "top-0 left-0",
    "top-right": "top-0 right-0 rotate-90",
    "bottom-left": "bottom-0 left-0 -rotate-90",
    "bottom-right": "bottom-0 right-0 rotate-180"
  };

  return (
    <div className={`absolute ${positionClasses[position]} ${className}`}>
      <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Sudut ornamen khas Sunda */}
        <path d="M0 0 L30 0 Q35 0, 35 5 L35 30 Q30 30, 25 35 L5 35 Q0 35, 0 30 Z" fill="#D97706" opacity="0.2" />
        <path d="M0 0 L20 0 Q23 0, 23 3 L23 20 Q20 20, 17 23 L3 23 Q0 23, 0 20 Z" fill="#D97706" opacity="0.3" />
        <circle cx="10" cy="10" r="3" fill="#D97706" opacity="0.5" />
        <circle cx="20" cy="10" r="2" fill="#D97706" opacity="0.4" />
        <circle cx="10" cy="20" r="2" fill="#D97706" opacity="0.4" />
      </svg>
    </div>
  );
};

export const SundaFlowerOrnament = ({ className = "w-16 h-16" }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Motif Kembang Sunda */}
    <g transform="translate(50,50)">
      <circle r="12" fill="#D97706" opacity="0.6" />
      {[0, 60, 120, 180, 240, 300].map((angle, i) => (
        <g key={i} transform={`rotate(${angle})`}>
          <ellipse cx="0" cy="-20" rx="8" ry="15" fill="#D97706" opacity="0.4" />
        </g>
      ))}
      <circle r="6" fill="#FBBF24" opacity="0.8" />
    </g>
  </svg>
);
