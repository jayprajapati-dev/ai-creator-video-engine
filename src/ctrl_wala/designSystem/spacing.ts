/**
 * CTRL_WALA Design System — Spacing & Layout Tokens
 * Grid: 1080 × 1920 portrait (9:16)
 */

export const SPACING = {
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  7: 28,
  8: 32,
  10: 40,
  12: 48,
  14: 56,
  16: 64,
  20: 80,
  24: 96,
  32: 128,
};

export const RADIUS = {
  sm: 6,
  md: 10,
  lg: 16,
  xl: 24,
  "2xl": 32,
  full: 9999,
};

/** Mobile safe zones for 1080×1920 vertical reels */
export const SAFE_ZONE = {
  // Top of video — platform UI (search bar, story indicators)
  topRestricted: 220,

  // Visual content focal zone
  contentTop: 230,
  contentBottom: 1420,

  // Caption zone (direct eye-level reading)
  captionTop: 1430,
  captionBottom: 1680,

  // Bottom overlay (like/comment/share icons, sound pill)
  bottomRestricted: 240,

  // Horizontal margin
  horizontalMargin: 60,

  // Corner crop guides
  cornerGuide: 72,
};

export const VIDEO = {
  width: 1080,
  height: 1920,
  fps: 30,
  durationFrames: 1800,
};

