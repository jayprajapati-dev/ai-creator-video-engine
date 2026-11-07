/**
 * Reel Blueprint 03: 3 Secret Claude 3.5 Sonnet Prompts — Version 3.0
 * Category: Developer Productivity & AI Hacks
 * Style: Mentor-walkthrough, Numbered Tip Cards
 * Audio: Native Word Phonetics (No C-L-A-U-D-E or S-O-N-N-E-T spelling, fluent pronunciation)
 */

import { ReelBlueprint } from "../engine/types";

export const claudePromptsBlueprint: ReelBlueprint = {
  id: "claude_prompts",
  title: "3 Claude 3.5 Sonnet Prompts that 10X Any Developer",
  category: "productivity-hacks",
  storytellingStyle: "mentor-walkthrough",
  primaryAccent: "amber",
  audioManifest: {
    reel: "claude_prompts",
    totalDurationFrames: 1208,
    totalDurationSec: 40.27,
    scenes: [
      {
        id: "scene_1_hook",
        text: "अगर तुम Claude 3.5 Sonnet use कर रहे हो, तो ये 3 secret prompts तुम्हारी coding speed 10X कर देंगे!",
        label: "10X DEV HACKS",
        audioFile: "audio/ctrl_wala/claude_prompts/scene_1_hook.mp3",
        totalMs: 7561,
        durationFrames: 235,
        startFrame: 0,
      },
      {
        id: "scene_2_prompt_arch",
        text: "Prompt #1: System Architect Prompt! ये code लिखने से पहले database schema और API contract design करता है।",
        label: "PROMPT 01",
        audioFile: "audio/ctrl_wala/claude_prompts/scene_2_prompt_arch.mp3",
        totalMs: 8980,
        durationFrames: 278,
        startFrame: 235,
      },
      {
        id: "scene_3_prompt_debug",
        text: "Prompt #2: Root Cause Debugger! Error log paste करो, ये 3 seconds में exact bug और fix बता देगा।",
        label: "PROMPT 02",
        audioFile: "audio/ctrl_wala/claude_prompts/scene_3_prompt_debug.mp3",
        totalMs: 8160,
        durationFrames: 253,
        startFrame: 513,
      },
      {
        id: "scene_4_prompt_tests",
        text: "Prompt #3: Edge Case Test Generator! 100% test coverage with zero effort!",
        label: "PROMPT 03",
        audioFile: "audio/ctrl_wala/claude_prompts/scene_4_prompt_tests.mp3",
        totalMs: 6840,
        durationFrames: 214,
        startFrame: 766,
      },
      {
        id: "scene_5_cta",
        text: "Comment करो PROMPT, और पूरी cheatsheet तुरंत DM में पाओ! Follow CTRL_WALA for daily AI drops!",
        label: "GET CHEATSHEET",
        audioFile: "audio/ctrl_wala/claude_prompts/scene_5_cta.mp3",
        totalMs: 7310,
        durationFrames: 228,
        startFrame: 980,
      },
    ],
  },
  scenes: [
    {
      id: "scene_1_hook",
      label: "10X DEVELOPER WORKFLOW",
      format: "hook-impact",
      headline: "10X Coding Speed Hack 🚀",
      subheadline: "ये 3 सीक्रेट Claude प्रॉम्प्ट्स सीनियर इंजीनियर्स इस्तेमाल करते हैं!",
      accent: "amber",
    },
    {
      id: "scene_2_prompt_arch",
      label: "PROMPT #1 · ARCHITECT",
      format: "numbered-tip",
      headline: "The System Architect",
      accent: "cyan",
      customData: {
        number: "01",
        title: "System Architect Persona",
        tagline: "Designs Schema & API contracts first",
        codeSnippet: "Act as a Principal Engineer. Before writing any code, analyze requirements, define strict TypeScript types, PostgreSQL schema, and REST endpoints.",
        takeaway: "Eliminates 90% of downstream refactors and architectural mistakes.",
      },
    },
    {
      id: "scene_3_prompt_debug",
      label: "PROMPT #2 · ROOT CAUSE",
      format: "numbered-tip",
      headline: "Root Cause Debugger",
      accent: "amber",
      customData: {
        number: "02",
        title: "Zero-Guesswork Debugger",
        tagline: "Pinpoints exact line of failure",
        codeSnippet: "Here is the stack trace and code snippet. Do NOT rewrite everything. Explain the exact variable state causing the crash and provide a minimal 3-line patch.",
        takeaway: "Saves hours of debugging cryptic runtime errors.",
      },
    },
    {
      id: "scene_4_prompt_tests",
      label: "PROMPT #3 · EDGE TESTS",
      format: "numbered-tip",
      headline: "Edge-Case Test Generator",
      accent: "emerald",
      customData: {
        number: "03",
        title: "Bulletproof Test Suite",
        tagline: "Tests nulls, race conditions & timeouts",
        codeSnippet: "Write Jest tests covering unusual edge cases: empty strings, boundary integers, network timeouts, and mock rejected promises.",
        takeaway: "Guarantees 100% test coverage with zero manual boilerplate.",
      },
    },
    {
      id: "scene_5_cta",
      label: "GET THE CHEATSHEET",
      format: "comment-cta",
      headline: "Free Markdown Cheatsheet",
      accent: "amber",
      customData: {
        keyword: "PROMPT",
        instruction: "likho aur Claude 3.5 Cheatsheet DM me pao",
      },
    },
  ],
};
