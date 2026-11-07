/**
 * CTRL_WALA Content-Aware Dynamic Video Generation Engine
 * Type Definitions & Blueprint Contracts
 */

export type VisualFormat =
  | "hook-impact"
  | "split-comparison"
  | "benchmark-data"
  | "before-after-transform"
  | "browser-walkthrough"
  | "code-terminal-demo"
  | "ai-chat-demo"
  | "numbered-tip"
  | "mascot-verdict"
  | "comment-cta";

export type AccentColor = "cyan" | "violet" | "emerald" | "amber";

export type ContentCategory =
  | "ai-models"
  | "developer-tools"
  | "fullstack-builder"
  | "productivity-hacks"
  | "open-source";

export type StorytellingStyle =
  | "data-driven"
  | "transformation-reveal"
  | "mentor-walkthrough"
  | "breaking-news";

export interface SceneAudioManifestItem {
  id: string;
  text: string;
  label: string;
  audioFile: string;
  totalMs: number;
  durationFrames: number;
  startFrame: number;
  sentences?: Array<{
    text: string;
    startMs: number;
    endMs: number;
  }>;
}

export interface ReelAudioManifest {
  reel: string;
  scenes: SceneAudioManifestItem[];
  totalDurationFrames: number;
  totalDurationSec: number;
}

export interface DynamicSceneBlueprint {
  id: string;
  label: string;
  format: VisualFormat;
  headline: string;
  subheadline?: string;
  accent?: AccentColor;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  customData?: Record<string, any>;
}

export interface ReelBlueprint {
  id: string;
  title: string;
  category: ContentCategory;
  storytellingStyle: StorytellingStyle;
  primaryAccent: AccentColor;
  audioManifest: ReelAudioManifest;
  scenes: DynamicSceneBlueprint[];
}
