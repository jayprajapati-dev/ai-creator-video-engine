/**
 * Reel Blueprint 02: V0 Full-Stack Web App Builder — Version 3.0
 * Category: Full-Stack Web Development & AI Tools
 * Style: Transformation-reveal, UI Walkthrough
 * Audio: Native Word Phonetics (No V-E-E-Z-E-R-O or N-E-X-T spelling, fluent pronunciation)
 */

import { ReelBlueprint } from "../engine/types";

export const v0BuilderBlueprint: ReelBlueprint = {
  id: "v0_builder",
  title: "Build Full Next.js Web Apps in 60 Seconds with V0",
  category: "fullstack-builder",
  storytellingStyle: "transformation-reveal",
  primaryAccent: "violet",
  audioManifest: {
    reel: "v0_builder",
    totalDurationFrames: 913,
    totalDurationSec: 30.43,
    scenes: [
      {
        id: "scene_1_hook",
        text: "अब Frontend Developers की छुट्टी? सिर्फ एक Prompt लिखो और पूरी Next.js वेबसाइट तैयार!",
        label: "FULL-STACK AI",
        audioFile: "audio/ctrl_wala/v0_builder/scene_1_hook.mp3",
        totalMs: 7225,
        durationFrames: 225,
        startFrame: 0,
      },
      {
        id: "scene_2_before_after",
        text: "एक रफ sketch या text prompt दो, और V0 उसे कुछ ही seconds में fully functional React app में बदल देता है!",
        label: "TRANSFORMATION",
        audioFile: "audio/ctrl_wala/v0_builder/scene_2_before_after.mp3",
        totalMs: 7710,
        durationFrames: 240,
        startFrame: 225,
      },
      {
        id: "scene_3_browser_inspect",
        text: "Clean Tailwind CSS, Lucide Icons और Shadcn UI components! कोई spaghetti code नहीं, बिल्कुल production ready!",
        label: "CODE QUALITY",
        audioFile: "audio/ctrl_wala/v0_builder/scene_3_browser_inspect.mp3",
        totalMs: 8780,
        durationFrames: 272,
        startFrame: 465,
      },
      {
        id: "scene_4_cta",
        text: "Comment करो V0, और मेरे Top 5 secret UI prompts तुम्हारे inbox में!",
        label: "GET PROMPTS",
        audioFile: "audio/ctrl_wala/v0_builder/scene_4_cta.mp3",
        totalMs: 5580,
        durationFrames: 176,
        startFrame: 737,
      },
    ],
  },
  scenes: [
    {
      id: "scene_1_hook",
      label: "FULL-STACK AI REVOLUTION",
      format: "hook-impact",
      headline: "Frontend Devs की छुट्टी? ⚡",
      subheadline: "सिर्फ एक प्रॉम्प्ट में Full Stack Next.js & Tailwind Dashboard तैयार!",
      accent: "violet",
    },
    {
      id: "scene_2_before_after",
      label: "INSTANT TRANSFORMATION",
      format: "before-after-transform",
      headline: "Raw Prompt ➔ Live Dashboard",
      accent: "violet",
      customData: {
        promptText: "Build a dark mode SaaS dashboard with revenue charts, user table and filter pills in Tailwind.",
        beforeTitle: "1. YOUR TEXT PROMPT",
        afterTitle: "2. DEPLOYED REACT APP",
      },
    },
    {
      id: "scene_3_browser_inspect",
      label: "PRODUCTION QUALITY CODE",
      format: "browser-walkthrough",
      headline: "Shadcn UI + Clean Tailwind",
      accent: "emerald",
      customData: {
        url: "https://v0.dev/preview/saas-dashboard",
        pageTitle: "SaaS Metrics & Activity Feed",
        pageDesc: "Zero Spaghetti Code • Fully Typed TypeScript • 100% Responsive",
        snippet: "export default function Dashboard() {\n  return <Card className='bg-zinc-950 border-zinc-800' />;\n}",
      },
    },
    {
      id: "scene_4_cta",
      label: "GET THE UI PROMPTS",
      format: "comment-cta",
      headline: "Top 5 Secret UI Prompts",
      accent: "violet",
      customData: {
        keyword: "V0",
        instruction: "likho aur Top 5 Production Prompts pao",
      },
    },
  ],
};
