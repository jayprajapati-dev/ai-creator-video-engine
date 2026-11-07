/**
 * CTRL_WALA — Premium Vector Icon Library
 *
 * Handcrafted, razor-sharp vector SVG icons for modern tech creator videos.
 * Zero emojis, zero generic AI artifacts. Pure, crisp, high-craft iconography.
 */

import React from "react";

interface IconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
}

// 1. Script / Code Document Icon
export const ScriptDocumentIcon: React.FC<IconProps> = ({ size = 24, color = "currentColor", style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
    <path
      d="M14 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V8L14 2Z"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M14 2V8H20" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M8 13H16" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
    <path d="M8 17H13" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
  </svg>
);

// 2. Studio Podcast Microphone
export const StudioMicIcon: React.FC<IconProps> = ({ size = 24, color = "currentColor", style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
    <rect x="8" y="2" width="8" height="12" rx="4" stroke={color} strokeWidth="2.5" />
    <path d="M4 10V11C4 15.4183 7.58172 19 12 19C16.4183 19 20 15.4183 20 11V10" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
    <path d="M12 19V22" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
    <path d="M8 22H16" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

// 3. Captions / Subtitles Frame
export const CaptionsBubbleIcon: React.FC<IconProps> = ({ size = 24, color = "currentColor", style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
    <rect x="3" y="4" width="18" height="16" rx="4" stroke={color} strokeWidth="2.5" />
    <path d="M7 10H17" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
    <path d="M7 14H13" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
  </svg>
);

// 4. Movie Clapperboard / Animation
export const ClapperMovieIcon: React.FC<IconProps> = ({ size = 24, color = "currentColor", style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
    <path
      d="M3 9H21V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V9Z"
      stroke={color}
      strokeWidth="2.5"
      strokeLinejoin="round"
    />
    <path
      d="M3 9L5.5 3H19.5L21 9H3Z"
      stroke={color}
      strokeWidth="2.5"
      strokeLinejoin="round"
    />
    <path d="M7.5 3L6 9" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <path d="M12 3L10.5 9" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <path d="M16.5 3L15 9" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </svg>
);

// 5. Official Python Vector
export const PythonBrandIcon: React.FC<IconProps> = ({ size = 24, style }) => (
  <svg width={size} height={size} viewBox="0 0 110 110" fill="none" style={style}>
    <path
      d="M54.5 7C36.6 7 37.8 14.8 37.8 14.8L37.9 22.8H55.4V25.3H30.8C20.6 25.3 11.5 31.4 11.5 45.4C11.5 59.4 19.9 61 25.3 61H30.4V53.7C30.4 45.5 37.6 38.8 45.8 38.8H63.4C69.3 38.8 74 34 74 28.2V14.8C74 14.8 73.1 7 54.5 7ZM45.6 12.8C48.2 12.8 50.3 14.9 50.3 17.5C50.3 20.1 48.2 22.2 45.6 22.2C43 22.2 40.9 20.1 40.9 17.5C40.9 14.9 43 12.8 45.6 12.8Z"
      fill="#387EB8"
    />
    <path
      d="M55.5 103C73.4 103 72.2 95.2 72.2 95.2L72.1 87.2H54.6V84.7H79.2C89.4 84.7 98.5 78.6 98.5 64.6C98.5 50.6 90.1 49 84.7 49H79.6V56.3C79.6 64.5 72.4 71.2 64.2 71.2H46.6C40.7 71.2 36 76 36 81.8V95.2C36 95.2 36.9 103 55.5 103ZM64.4 97.2C61.8 97.2 59.7 95.1 59.7 92.5C59.7 89.9 61.8 87.8 64.4 87.8C67 87.8 69.1 89.9 69.1 92.5C69.1 95.1 67 97.2 64.4 97.2Z"
      fill="#FFE052"
    />
  </svg>
);

// 6. Anthropic Claude Starburst
export const ClaudeSparkleIcon: React.FC<IconProps> = ({ size = 24, color = "#CC6633", style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
    <path
      d="M12 2L13.8 8.6C14.2 10.1 15.4 11.3 16.9 11.7L23.5 13.5L16.9 15.3C15.4 15.7 14.2 16.9 13.8 18.4L12 25L10.2 18.4C9.8 16.9 8.6 15.7 7.1 15.3L0.5 13.5L7.1 11.7C8.6 11.3 9.8 10.1 10.2 8.6L12 2Z"
      fill={color}
    />
  </svg>
);

// 7. OpenAI Vector Spiral
export const OpenAIGlyphIcon: React.FC<IconProps> = ({ size = 24, color = "currentColor", style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
    <path
      d="M21.2 10.5C20.9 8.4 19.5 6.7 17.5 6V8.2C18.6 8.7 19.4 9.8 19.5 11.1L21.2 10.5ZM16.3 3.6C14.7 2.6 12.7 2.4 10.9 3.2L11.8 5C13 4.5 14.3 4.6 15.4 5.2L16.3 3.6ZM6.7 4.8C5.2 6.2 4.5 8.2 4.8 10.3L6.7 9.8C6.5 8.5 7 7.1 8 6.2L6.7 4.8ZM2.8 13.5C3.1 15.6 4.5 17.3 6.5 18V15.8C5.4 15.3 4.6 14.2 4.5 12.9L2.8 13.5ZM7.7 20.4C9.3 21.4 11.3 21.6 13.1 20.8L12.2 19C11 19.5 9.7 19.4 8.6 18.8L7.7 20.4ZM17.3 19.2C18.8 17.8 19.5 15.8 19.2 13.7L17.3 14.2C17.5 15.5 17 16.9 16 17.8L17.3 19.2Z"
      fill={color}
    />
  </svg>
);

// 8. Studio Headphones
export const StudioHeadphonesIcon: React.FC<IconProps> = ({ size = 24, color = "currentColor", style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
    <path d="M3 14V12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12V14" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
    <rect x="2" y="13" width="5" height="8" rx="2.5" fill={color} />
    <rect x="17" y="13" width="5" height="8" rx="2.5" fill={color} />
  </svg>
);

// 9. Check Badge (Clean Solid)
export const CheckBadgeSolidIcon: React.FC<IconProps> = ({ size = 24, color = "#10B981", style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
    <circle cx="12" cy="12" r="10" fill={color} stroke="#18181B" strokeWidth="2.5" />
    <path d="M8 12.5L10.5 15L16 9.5" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// 10. Cross Badge (Clean Solid)
export const CrossBadgeSolidIcon: React.FC<IconProps> = ({ size = 24, color = "#EF4444", style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
    <circle cx="12" cy="12" r="10" fill={color} stroke="#18181B" strokeWidth="2.5" />
    <path d="M9 9L15 15" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M15 9L9 15" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

// 11. Sleek Terminal Window
export const TerminalSleekIcon: React.FC<IconProps> = ({ size = 24, color = "currentColor", style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
    <rect x="3" y="4" width="18" height="16" rx="4" stroke={color} strokeWidth="2.5" />
    <path d="M7 9L10 12L7 15" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M13 15H17" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

// 12. Lightning Bolt (Speed / 10x)
export const LightningBoltIcon: React.FC<IconProps> = ({ size = 24, color = "#FF8E60", style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
    <path
      d="M13 2L3 14H12L11 22L21 10H12L13 2Z"
      fill={color}
      stroke="#18181B"
      strokeWidth="2.2"
      strokeLinejoin="round"
    />
  </svg>
);

// 13. Animated macOS Click Cursor Pointer
export const CursorClickPointer: React.FC<{
  x: number;
  y: number;
  clicking?: boolean;
}> = ({ x, y, clicking = false }) => {
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        pointerEvents: "none",
        zIndex: 99,
        transform: clicking ? "scale(0.88)" : "scale(1)",
        transition: "transform 0.1s ease",
      }}
    >
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
        <path
          d="M4.5 3.5L10.5 20.5L13.8 13.8L20.5 10.5L4.5 3.5Z"
          fill="#18181B"
          stroke="#FFFFFF"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </svg>
      {clicking && (
        <div
          style={{
            position: "absolute",
            left: 2,
            top: 2,
            width: 28,
            height: 28,
            borderRadius: "50%",
            border: "3px solid #7C3AED",
            animation: "none",
            transform: "translate(-50%, -50%)",
            opacity: 0.8,
          }}
        />
      )}
    </div>
  );
};

