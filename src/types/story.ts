export type HighlightColor = "red" | "yellow" | "white";

export interface CaptionChunk {
  text: string;
  highlightWords?: string[];
  highlightColor?: HighlightColor;
  startFrame: number;
  durationFrames: number;
}

export interface StoryScene {
  id: string;
  title: string;
  timecode: string;
  startFrame: number;
  durationFrames: number;
  audioFile?: string;
  captions: CaptionChunk[];
}

export interface EpisodeConfig {
  id: string;
  seriesTitle: string;
  episodeNumber: number;
  episodeTitle: string;
  aspectRatio: "9:16";
  width: 1080;
  height: 1920;
  fps: 30;
  durationInFrames: 1800; // 60s @ 30fps
  scenes: StoryScene[];
  audio: {
    ambientDrone: string;
    narrationTrack?: string;
  };
}

