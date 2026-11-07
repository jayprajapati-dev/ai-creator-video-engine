/**
 * CTRL_WALA Design System — Light Typography Tokens
 * Bold, highly readable. Inspired by Techstackbro educational style.
 */

export const LIGHT_FONTS = {
  display: "'Plus Jakarta Sans', 'Inter', system-ui, sans-serif",
  body: "'Inter', 'Segoe UI', system-ui, sans-serif",
  code: "'JetBrains Mono', 'Fira Code', 'Consolas', monospace",
} as const;

export const LIGHT_FONT_SIZE = {
  xs: 20,     // timestamps, labels
  sm: 24,     // secondary body
  base: 30,   // primary body
  md: 34,     // subheadings
  lg: 42,     // scene headlines
  xl: 52,     // large headlines
  "2xl": 64,  // hero text
  "3xl": 80,  // giant hook text
  step: 28,   // step indicator text
  code: 22,   // code font size
  codeSm: 18, // small code
  caption: 36, // caption text
} as const;

export const LIGHT_FONT_WEIGHT = {
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extrabold: 800,
  black: 900,
} as const;

export const LIGHT_LINE_HEIGHT = {
  tight: 1.1,
  normal: 1.4,
  relaxed: 1.6,
  code: 1.7,
} as const;

