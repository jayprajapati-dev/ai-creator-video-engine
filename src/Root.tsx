import React from "react";
import { Composition } from "remotion";
import { StoryReel } from "./Composition";
import { episode1Config } from "./config/episode1";
import { HindiReel } from "./hindi/HindiReel";
import { HindiReelEp02 } from "./hindi/ep02/HindiReelEp02";
import { ChannelLogo, YouTubeBanner } from "./branding/ChannelBranding";
import { Thumbnail16x9 } from "./branding/Thumbnail16x9";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* Original English Episode: Night Stories Ep.01 */}
      <Composition
        id="StoryReel"
        component={StoryReel}
        durationInFrames={1800}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          config: episode1Config,
        }}
      />

      {/* THE UNKNOWN CITY — Hindi Episode 01: Mall Band Tha... Phir Lift Kisne Chalayi? */}
      <Composition
        id="HindiReel"
        component={HindiReel}
        durationInFrames={1800}
        fps={30}
        width={1080}
        height={1920}
      />

      {/* THE UNKNOWN CITY — Hindi Episode 02: B1 Par Aarav Ka Intezar Kaun Kar Raha Tha? */}
      <Composition
        id="HindiReelEp02"
        component={HindiReelEp02}
        durationInFrames={1800}
        fps={30}
        width={1080}
        height={1920}
      />

      {/* Channel Profile Picture (Logo) — 800 x 800 (1:1 Circular Crop Safe) */}
      <Composition
        id="ChannelLogo"
        component={ChannelLogo}
        durationInFrames={1}
        fps={30}
        width={800}
        height={800}
      />

      {/* Official YouTube Channel Banner — 2560 x 1440 (Safe Area: 1546 x 423) */}
      <Composition
        id="YouTubeBanner"
        component={YouTubeBanner}
        durationInFrames={1}
        fps={30}
        width={2560}
        height={1440}
      />

      {/* High-CTR YouTube Video Thumbnail — 1920 x 1080 (16:9 Standard) */}
      <Composition
        id="Thumbnail16x9"
        component={Thumbnail16x9}
        durationInFrames={1}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
