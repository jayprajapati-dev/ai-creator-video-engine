/**
 * CTRL_WALA Design System — Animation Utilities
 *
 * All animations are deterministic frame-based (Remotion-compatible).
 * No Math.random(), no CSS animations, no browser timers.
 */

import { interpolate, spring } from "remotion";

/** Clamp a value between min and max */
export const clamp = (val: number, min: number, max: number): number =>
  Math.min(Math.max(val, min), max);

/**
 * Standard entrance: spring scale + translateY
 * Returns { scale, translateY } for a smooth pop-in entrance.
 */
export const entranceSpring = (
  frame: number,
  fps: number,
  delay = 0,
  stiffness = 180,
  damping = 16
) => {
  const f = Math.max(0, frame - delay);
  const s = spring({ frame: f, fps, config: { stiffness, damping } });
  return {
    scale: s,
    translateY: interpolate(s, [0, 1], [30, 0]),
    opacity: clamp(s, 0, 1),
  };
};

/**
 * Fade in over N frames, starting at 'delay'.
 */
export const fadeIn = (frame: number, delay = 0, durationFrames = 15): number =>
  interpolate(frame, [delay, delay + durationFrames], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

/**
 * Fade out over N frames, starting at 'startFrame'.
 */
export const fadeOut = (frame: number, startFrame: number, durationFrames = 15): number =>
  interpolate(frame, [startFrame, startFrame + durationFrames], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

/**
 * Slide in from the right, springs to position.
 */
export const slideInFromRight = (frame: number, fps: number, delay = 0, distance = 120) => {
  const f = Math.max(0, frame - delay);
  const s = spring({ frame: f, fps, config: { stiffness: 200, damping: 20 } });
  return {
    translateX: interpolate(s, [0, 1], [distance, 0]),
    opacity: clamp(s, 0, 1),
  };
};

/**
 * Slide in from bottom.
 */
export const slideInFromBottom = (frame: number, fps: number, delay = 0, distance = 60) => {
  const f = Math.max(0, frame - delay);
  const s = spring({ frame: f, fps, config: { stiffness: 220, damping: 18 } });
  return {
    translateY: interpolate(s, [0, 1], [distance, 0]),
    opacity: clamp(s, 0, 1),
  };
};

/**
 * Deterministic pseudo-typing progress for terminals/AI simulators.
 * Returns how many characters should be visible at a given frame,
 * given an average characters-per-frame rate.
 *
 * charsPerFrame: for 30fps, 1.5 gives ~45 chars/sec (fast typist)
 */
export const typingProgress = (
  frame: number,
  startFrame: number,
  totalChars: number,
  charsPerFrame = 1.5
): number => {
  const elapsed = Math.max(0, frame - startFrame);
  return clamp(Math.floor(elapsed * charsPerFrame), 0, totalChars);
};

/**
 * Blinking cursor: on for 'onFrames', off for 'offFrames'.
 */
export const blinkCursor = (frame: number, onFrames = 15, offFrames = 15): boolean =>
  frame % (onFrames + offFrames) < onFrames;

/**
 * Pulsating scale — good for CTA badges (non-random, sine-wave based).
 * Returns a scale multiplier around 1.0.
 */
export const pulsate = (frame: number, amplitude = 0.03, periodFrames = 40): number =>
  1 + amplitude * Math.sin((frame / periodFrames) * Math.PI * 2);

/**
 * Camera parallax — used for subtle depth on static backgrounds.
 */
export const parallax = (frame: number, totalFrames: number, strength = 20): number =>
  interpolate(frame, [0, totalFrames], [-strength, strength], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

/**
 * Step reveal: returns whether a given step index should be visible.
 * Used for showing terminal lines or list items one-by-one.
 */
export const stepVisible = (
  frame: number,
  stepIndex: number,
  startFrame: number,
  framesPerStep: number
): boolean => frame >= startFrame + stepIndex * framesPerStep;

/**
 * Loading bar progress (0–1) over a given frame window.
 */
export const loadingProgress = (
  frame: number,
  startFrame: number,
  durationFrames: number
): number =>
  interpolate(frame, [startFrame, startFrame + durationFrames], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
