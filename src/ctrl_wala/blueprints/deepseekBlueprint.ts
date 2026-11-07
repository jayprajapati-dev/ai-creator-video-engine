/**
 * Reel Blueprint 01: DeepSeek V3 vs GPT-4o — Version 3.0
 * Category: AI Benchmark & Model Comparison
 * Style: Data-driven, High-Contrast Shock Value
 * Audio: Native Word Phonetics (No D-E-E-P-S-E-E-K spelling, fluent pronunciation)
 */

import { ReelBlueprint } from "../engine/types";

export const deepseekBlueprint: ReelBlueprint = {
  id: "deepseek_vs_gpt4o",
  title: "OpenAI Killer? DeepSeek V3 Benchmark Breakdown",
  category: "ai-models",
  storytellingStyle: "data-driven",
  primaryAccent: "cyan",
  audioManifest: {
    reel: "deepseek_vs_gpt4o",
    totalDurationFrames: 1278,
    totalDurationSec: 42.6,
    scenes: [
      {
        id: "scene_1_hook",
        text: "OpenAI का खेल खत्म? DeepSeek V3 ने AI की पूरी दुनिया को हिला दिया है!",
        label: "SHOCKING BREAKTHROUGH",
        audioFile: "audio/ctrl_wala/deepseek_vs_gpt4o/scene_1_hook.mp3",
        totalMs: 6621,
        durationFrames: 207,
        startFrame: 0,
      },
      {
        id: "scene_2_split_compare",
        text: "GPT-4o का 1M Tokens $2.50 का है, जबकि DeepSeek सिर्फ $0.14! यानी पूरे 95% सस्ता!",
        label: "COST SHOCK",
        audioFile: "audio/ctrl_wala/deepseek_vs_gpt4o/scene_2_split_compare.mp3",
        totalMs: 9820,
        durationFrames: 303,
        startFrame: 207,
      },
      {
        id: "scene_3_benchmarks",
        text: "Coding benchmarks में 671B parameters का ये beast GPT-4o और Claude 3.5 को बराबर टक्कर दे रहा है!",
        label: "ACCURACY BENCHMARK",
        audioFile: "audio/ctrl_wala/deepseek_vs_gpt4o/scene_3_benchmarks.mp3",
        totalMs: 9150,
        durationFrames: 283,
        startFrame: 510,
      },
      {
        id: "scene_4_mascot_verdict",
        text: "और सबसे बड़ी बात—यह पूरी तरह Open Weights है! अपने लोकल सर्वर पर बिना API कॉस्ट के रन करो।",
        label: "CTRL WALA VERDICT",
        audioFile: "audio/ctrl_wala/deepseek_vs_gpt4o/scene_4_mascot_verdict.mp3",
        totalMs: 8350,
        durationFrames: 259,
        startFrame: 793,
      },
      {
        id: "scene_5_cta",
        text: "Comment करो DEEPSEEK, और मैं तुम्हें इसका Local Setup Guide और API keys तुरंत DM कर दूंगा!",
        label: "GET LOCAL GUIDE",
        audioFile: "audio/ctrl_wala/deepseek_vs_gpt4o/scene_5_cta.mp3",
        totalMs: 7240,
        durationFrames: 226,
        startFrame: 1052,
      },
    ],
  },
  scenes: [
    {
      id: "scene_1_hook",
      label: "SHOCKING BREAKTHROUGH",
      format: "hook-impact",
      headline: "OpenAI का खेल खत्म? 🤯",
      subheadline: "DeepSeek V3 ने 671B पैरामीटर्स के साथ पूरी AI इंडस्ट्री को हिला दिया!",
      accent: "cyan",
    },
    {
      id: "scene_2_split_compare",
      label: "COST COMPARISON",
      format: "split-comparison",
      headline: "95% Cheaper than GPT-4o",
      accent: "cyan",
      customData: {
        metricLabel: "Cost Per 1M Tokens (Blended)",
        savingBadge: "95% CHEAPER",
        left: {
          name: "OpenAI GPT-4o",
          badge: "CLOSED API",
          badgeColor: "#EF4444",
          pricePerMillion: "$2.50",
          speed: "120 t/s",
          openSource: false,
        },
        right: {
          name: "DeepSeek V3",
          badge: "OPEN WEIGHTS",
          badgeColor: "#00F2FE",
          pricePerMillion: "$0.14",
          speed: "140 t/s",
          openSource: true,
          highlight: true,
        },
      },
    },
    {
      id: "scene_3_benchmarks",
      label: "ACCURACY BENCHMARKS",
      format: "benchmark-data",
      headline: "Coding & Math Benchmarks",
      accent: "emerald",
      customData: {
        benchmarks: [
          {
            benchmark: "HumanEval",
            category: "Python Coding",
            scoreA: 90.2,
            scoreB: 91.6,
            modelAName: "GPT-4o",
            modelBName: "DeepSeek V3",
          },
          {
            benchmark: "MATH 500",
            category: "Complex Math",
            scoreA: 74.6,
            scoreB: 80.2,
            modelAName: "GPT-4o",
            modelBName: "DeepSeek V3",
          },
          {
            benchmark: "MMLU",
            category: "General Knowledge",
            scoreA: 87.2,
            scoreB: 88.5,
            modelAName: "GPT-4o",
            modelBName: "DeepSeek V3",
          },
        ],
      },
    },
    {
      id: "scene_4_mascot_verdict",
      label: "CTRL WALA VERDICT",
      format: "mascot-verdict",
      headline: "100% Open Weights Revolution",
      subheadline: "Ollama या vLLM पर अपने खुद के हार्डवेयर पर लोकली होस्ट करो!",
      accent: "cyan",
      customData: {
        extraPill: "⚡ ollama run deepseek-v3:latest  (Zero data privacy risk)",
      },
    },
    {
      id: "scene_5_cta",
      label: "GET THE GUIDE",
      format: "comment-cta",
      headline: "Local Setup Guide",
      accent: "cyan",
      customData: {
        keyword: "DEEPSEEK",
        instruction: "likho aur direct download guide pao",
      },
    },
  ],
};
