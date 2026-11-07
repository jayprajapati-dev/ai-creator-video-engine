/**
 * CTRL_WALA Design System — Master Theme
 *
 * Single import point for all design tokens.
 * Usage: import { THEME } from '../designSystem/theme'
 */

import { COLORS } from "./colors";
import { FONTS, FONT_SIZE, FONT_WEIGHT, LINE_HEIGHT, LETTER_SPACING, TEXT_STYLES } from "./typography";
import { SPACING, RADIUS, SAFE_ZONE, VIDEO } from "./spacing";

export const THEME = {
  colors: COLORS,
  fonts: FONTS,
  fontSize: FONT_SIZE,
  fontWeight: FONT_WEIGHT,
  lineHeight: LINE_HEIGHT,
  letterSpacing: LETTER_SPACING,
  textStyles: TEXT_STYLES,
  spacing: SPACING,
  radius: RADIUS,
  safeZone: SAFE_ZONE,
  video: VIDEO,
} as const;

export type Theme = typeof THEME;
