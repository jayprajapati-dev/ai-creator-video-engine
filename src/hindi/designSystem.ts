/**
 * THE UNKNOWN CITY — Episode 01
 * Hindi Type System: Devanagari-safe font stack + design tokens
 */

export const HINDI_DESIGN = {
  // Color palette — midnight cinematic
  colors: {
    bg: "#05080F",           // Deep midnight
    bgMid: "#0A1020",        // Dark charcoal blue
    bgLight: "#0F1A30",      // Slightly lighter panel
    cyan: "#00D4D4",          // Muted cyan accent
    cyanDim: "#007A8A",       // Dark cyan glow
    warmLight: "#F4A136",     // Warm indoor lamp orange
    red: "#DC2626",           // Warning red
    redDim: "#7F1D1D",        // Dim red glow
    text: "#F1F5F9",          // Near-white primary text
    textDim: "#94A3B8",       // Dim secondary text
    cctv: "#1A2F1A",          // CCTV phosphor green background
    cctvGreen: "#22C55E",     // CRT scanline green
    shadow: "#000000",
    gold: "#F59E0B",          // Cliffhanger highlight
  },
  // Typography — Devanagari-compatible system font stack
  fonts: {
    hindi: "'Noto Sans Devanagari', 'Mangal', 'Kokila', 'Arial Unicode MS', sans-serif",
    display: "'Noto Sans Devanagari', 'Mangal', system-ui, sans-serif",
    mono: "'Courier New', Courier, monospace",
    english: "system-ui, -apple-system, 'Segoe UI', sans-serif",
  },
  // Spacing & layout
  safeMargin: 72,
  captionBottom: 200,
  captionMaxWidth: 940,
};

