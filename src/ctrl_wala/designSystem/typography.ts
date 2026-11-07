/**
 * CTRL_WALA Design System — Typography Tokens
 *
 * Font Loading Strategy for Remotion:
 * Remotion uses a Chromium-based renderer. Remotion's loadFont() helper
 * fetches fonts from Google Fonts at render time. We load fonts
 * explicitly using @remotion/google-fonts or CSS @font-face in a
 * delayRender/continueRender block in the composition.
 *
 * Since @remotion/google-fonts may not be installed, we use the
 * staticFile approach and system fallbacks that Remotion's Chromium
 * will resolve. For the monospace code font we use Courier New which
 * is always available.
 *
 * To use custom fonts, add loadFont() calls in composition root files.
 */

export const FONTS = {
  // Display — for bold headlines and hooks
  // Google Font: "Space Grotesk" — excellent for tech, angular, modern
  display: "'Space Grotesk', 'Segoe UI', system-ui, -apple-system, sans-serif",

  // Body — for captions, narration, labels
  // Google Font: "Inter" — most legible at small mobile sizes
  body: "'Inter', 'Segoe UI', system-ui, -apple-system, sans-serif",

  // Code — for terminals, code editors, diffs
  // JetBrains Mono via Google Fonts — excellent monospace with ligatures
  code: "'JetBrains Mono', 'Courier New', Courier, monospace",

  // Hindi / Devanagari — preserved from legacy system
  hindi: "'Noto Sans Devanagari', 'Mangal', 'Kokila', 'Arial Unicode MS', sans-serif",
};

// Modular scale (base 16px, ratio ~1.333)
export const FONT_SIZE = {
  xs: 20,
  sm: 24,
  base: 32,
  md: 40,
  lg: 48,
  xl: 60,
  "2xl": 72,
  "3xl": 88,
  "4xl": 108,
  display: 136,
};

export const FONT_WEIGHT = {
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extrabold: 800,
  black: 900,
};

export const LINE_HEIGHT = {
  tight: 1.1,
  snug: 1.2,
  normal: 1.4,
  relaxed: 1.6,
};

export const LETTER_SPACING = {
  tight: "-0.03em",
  normal: "0em",
  wide: "0.05em",
  wider: "0.1em",
  widest: "0.15em",
};

/** Typography text style presets for common UI uses */
export const TEXT_STYLES = {
  hook: {
    fontFamily: FONTS.display,
    fontSize: FONT_SIZE["3xl"],
    fontWeight: FONT_WEIGHT.black,
    letterSpacing: LETTER_SPACING.tight,
    lineHeight: LINE_HEIGHT.tight,
  },
  headline: {
    fontFamily: FONTS.display,
    fontSize: FONT_SIZE["2xl"],
    fontWeight: FONT_WEIGHT.extrabold,
    letterSpacing: LETTER_SPACING.tight,
    lineHeight: LINE_HEIGHT.snug,
  },
  subheadline: {
    fontFamily: FONTS.body,
    fontSize: FONT_SIZE.xl,
    fontWeight: FONT_WEIGHT.bold,
    letterSpacing: LETTER_SPACING.normal,
    lineHeight: LINE_HEIGHT.snug,
  },
  caption: {
    fontFamily: FONTS.body,
    fontSize: FONT_SIZE.lg,
    fontWeight: FONT_WEIGHT.semibold,
    letterSpacing: LETTER_SPACING.normal,
    lineHeight: LINE_HEIGHT.normal,
  },
  label: {
    fontFamily: FONTS.body,
    fontSize: FONT_SIZE.sm,
    fontWeight: FONT_WEIGHT.semibold,
    letterSpacing: LETTER_SPACING.wider,
    lineHeight: LINE_HEIGHT.normal,
  },
  code: {
    fontFamily: FONTS.code,
    fontSize: FONT_SIZE.sm,
    fontWeight: FONT_WEIGHT.regular,
    letterSpacing: LETTER_SPACING.normal,
    lineHeight: LINE_HEIGHT.relaxed,
  },
  codeLarge: {
    fontFamily: FONTS.code,
    fontSize: FONT_SIZE.base,
    fontWeight: FONT_WEIGHT.regular,
    letterSpacing: LETTER_SPACING.normal,
    lineHeight: LINE_HEIGHT.relaxed,
  },
  hindi: {
    fontFamily: "'Noto Sans Devanagari', 'Mangal', sans-serif",
    fontSize: FONT_SIZE.lg,
    fontWeight: FONT_WEIGHT.extrabold,
    letterSpacing: LETTER_SPACING.normal,
    lineHeight: LINE_HEIGHT.normal,
  },
};

