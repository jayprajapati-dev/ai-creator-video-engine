/**
 * CTRL_WALA Design System — Light Theme Color Tokens
 * Inspired by Techstackbro reference style.
 * Light grey background, white cards, orange step labels, purple highlights.
 */

export const LIGHT = {
  // ── Backgrounds ───────────────────────────────────────────────
  bg: {
    base: "#EBEBEB",          // Light grey page background (with dot pattern)
    card: "#FFFFFF",           // White card / panel
    cardElevated: "#F9F9F9",   // Slightly off-white elevated card
    codeCard: "#F3F3F3",       // Code block background
    terminal: "#1E1E1E",       // Terminal inner background
    codeInner: "#282828",      // VS Code editor dark inner
    overlay: "rgba(0,0,0,0.04)",
  },

  // ── Borders ───────────────────────────────────────────────────
  border: {
    card: "#1A1A1A",           // Thick dark card border (Techstackbro style)
    cardWidth: 2.5,
    cardRadius: 16,
    subtle: "#E0E0E0",         // Subtle dividers
    medium: "#C0C0C0",         // Medium borders
    code: "#D0D0D0",           // Code card border
  },

  // ── Orange — Step labels, section badges ──────────────────────
  orange: {
    pure: "#FF6B35",           // Primary orange
    bg: "#FF6B35",             // Step pill background
    bgLight: "#FFF0EB",        // Orange tinted background
    text: "#FFFFFF",           // White text on orange
    border: "#E55B25",         // Slightly darker border
  },

  // ── Purple — Highlights, tech terms, keywords ─────────────────
  purple: {
    pure: "#7C3AED",           // Primary purple
    bright: "#9333EA",         // Bright purple for text
    bg: "#F3EDFF",             // Purple word highlight background
    bgDark: "#7C3AED",         // Dark purple for speech bubble words
    text: "#7C3AED",           // Purple text
    textOnDark: "#FFFFFF",     // White text on dark purple
    border: "#6D28D9",         // Darker purple border
  },

  // ── Green — Selected take, success ───────────────────────────
  green: {
    pure: "#22C55E",
    bg: "#DCFCE7",
    text: "#16A34A",
    card: "#22C55E",           // Green selected take card
    textOnGreen: "#FFFFFF",
  },

  // ── Red — Rejected take, error ────────────────────────────────
  red: {
    pure: "#EF4444",
    bg: "#FEE2E2",
    text: "#DC2626",
    card: "#EF4444",
  },

  // ── Grey scale ────────────────────────────────────────────────
  grey: {
    50: "#FAFAFA",
    100: "#F5F5F5",
    200: "#E5E5E5",
    300: "#D4D4D4",
    400: "#A3A3A3",
    500: "#737373",
    600: "#525252",
    700: "#404040",
    800: "#262626",
    900: "#171717",
  },

  // ── Text ──────────────────────────────────────────────────────
  text: {
    primary: "#1A1A1A",        // Near black — main copy
    secondary: "#525252",      // Medium grey
    muted: "#9CA3AF",          // Light grey
    code: "#1E1E1E",           // Code text
    white: "#FFFFFF",          // White text
    orange: "#FF6B35",         // Orange label text
    purple: "#7C3AED",         // Purple keyword text
  },

  // ── Dot pattern ──────────────────────────────────────────────
  dot: {
    color: "#C8C8C8",          // Dot color on light grey bg
    size: 2,                   // Dot radius in px
    gap: 24,                   // Gap between dots
  },

  // ── Shadows ──────────────────────────────────────────────────
  shadow: {
    card: "0 4px 20px rgba(0,0,0,0.10), 0 1px 4px rgba(0,0,0,0.06)",
    cardStrong: "0 8px 32px rgba(0,0,0,0.14), 0 2px 8px rgba(0,0,0,0.08)",
    pill: "0 2px 8px rgba(0,0,0,0.12)",
    mascot: "0 8px 32px rgba(0,0,0,0.20)",
  },

  // ── Waveform ─────────────────────────────────────────────────
  waveform: {
    bar: "#9B59B6",            // Purple waveform bars
    barLight: "#C89BD6",       // Lighter purple for variation
    bg: "#F8F4FF",             // Light purple tinted waveform background
  },

  // ── macOS traffic lights ──────────────────────────────────────
  trafficLights: {
    red: "#FF5F57",
    yellow: "#FFBD2E",
    green: "#28C840",
  },
} as const;

export type LightTheme = typeof LIGHT;

