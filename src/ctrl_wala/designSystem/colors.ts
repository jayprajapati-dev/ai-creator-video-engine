/**
 * CTRL_WALA Design System — Color Tokens
 * Premium AI & Technology Creator Brand
 */

export const COLORS = {
  // ── Backgrounds ───────────────────────────────────────────────
  bg: {
    base: "#090D16",       // Pitch void — composition background
    deep: "#04060A",       // Deepest black
    surface: "#0E1626",    // Card / panel surface
    surfaceHigh: "#151F32", // Elevated card
    surfaceBorder: "#1E2D4A", // Subtle border on cards
  },

  // ── Accent — Cyan (AI, Future, Info) ──────────────────────────
  cyan: {
    pure: "#00F2FE",
    bright: "#4FACFE",
    muted: "#0EA5E9",
    glow: "rgba(0, 242, 254, 0.18)",
    glowStrong: "rgba(0, 242, 254, 0.35)",
    dim: "rgba(0, 242, 254, 0.08)",
  },

  // ── Accent — Violet (Prompt, AI response, Magic) ──────────────
  violet: {
    pure: "#8B5CF6",
    bright: "#A78BFA",
    muted: "#7C3AED",
    glow: "rgba(139, 92, 246, 0.18)",
    glowStrong: "rgba(139, 92, 246, 0.35)",
    dim: "rgba(139, 92, 246, 0.08)",
  },

  // ── Accent — Emerald (Code, Success, Terminal) ─────────────────
  emerald: {
    pure: "#10B981",
    bright: "#34D399",
    muted: "#059669",
    glow: "rgba(16, 185, 129, 0.18)",
    glowStrong: "rgba(16, 185, 129, 0.35)",
    dim: "rgba(16, 185, 129, 0.08)",
  },

  // ── Accent — Amber (Warning, Highlight, Keyword) ──────────────
  amber: {
    pure: "#F59E0B",
    bright: "#FCD34D",
    muted: "#D97706",
    glow: "rgba(245, 158, 11, 0.18)",
    glowStrong: "rgba(245, 158, 11, 0.35)",
    dim: "rgba(245, 158, 11, 0.08)",
  },

  // ── Accent — Rose (Error, Danger, Removal) ────────────────────
  rose: {
    pure: "#F43F5E",
    bright: "#FB7185",
    muted: "#E11D48",
    glow: "rgba(244, 63, 94, 0.18)",
    dim: "rgba(244, 63, 94, 0.08)",
  },

  // ── Text ──────────────────────────────────────────────────────
  text: {
    primary: "#F1F5F9",    // Near white — headlines, main copy
    secondary: "#94A3B8",  // Muted — timestamps, labels
    tertiary: "#475569",   // Very dim — inactive states
    inverse: "#090D16",    // Dark text on light surfaces
    code: "#E2E8F0",       // Code content
    codeKeyword: "#A78BFA",   // keyword color in code
    codeString: "#34D399",    // string color in code
    codeComment: "#475569",   // comment color in code
    codeProp: "#00F2FE",      // property / function name
    codeNumber: "#FCD34D",    // number literal
  },

  // ── Gradient Presets ─────────────────────────────────────────
  gradient: {
    cyanViolet: "linear-gradient(135deg, #00F2FE 0%, #8B5CF6 100%)",
    cyanEmerald: "linear-gradient(135deg, #00F2FE 0%, #10B981 100%)",
    violetAmber: "linear-gradient(135deg, #8B5CF6 0%, #F59E0B 100%)",
    bgDeep: "linear-gradient(180deg, #04060A 0%, #090D16 60%, #0E1626 100%)",
  },

  // ── Utility ───────────────────────────────────────────────────
  black: "#000000",
  white: "#FFFFFF",
  transparent: "transparent",
};

