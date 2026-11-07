/**
 * CTRL_WALA Audio Track Engine — Version 2.0
 * Features:
 *  - High-energy Hinglish narration voiceover
 *  - Synchronized transition whooshes
 *  - Mechanical keyboard typing SFX on code/terminal scenes
 *  - UI pop dings on card entrances
 *  - Cyber impact sub-bass on hooks
 *  - Continuous background synth beat loop
 */

import React from "react";
import { Audio, Sequence, staticFile } from "remotion";
import { ReelAudioManifest } from "../engine/types";

interface CtrlWalaAudioTrackProps {
  manifest: ReelAudioManifest;
}

export const CtrlWalaAudioTrack: React.FC<CtrlWalaAudioTrackProps> = ({ manifest }) => {
  return (
    <>
      {/* Background Tech Beat (ducked to 0.12 volume for clear voiceover) */}
      <Audio
        src={staticFile("audio/ctrl_wala/sfx/tech_beat_loop.wav")}
        volume={0.12}
        loop
      />

      {/* Cyber impact on first scene hook */}
      <Sequence durationInFrames={35}>
        <Audio src={staticFile("audio/ctrl_wala/sfx/cyber_impact.wav")} volume={0.75} />
      </Sequence>

      {/* Scene by scene narration and dynamic SFX triggers */}
      {manifest.scenes.map((scene, idx) => {
        const isCta = idx === manifest.scenes.length - 1;
        const isCodeScene = idx === 1 || idx === 2;

        return (
          <React.Fragment key={scene.id}>
            {/* Transition Whoosh between scenes */}
            {idx > 0 && (
              <Sequence from={Math.max(0, scene.startFrame - 4)} durationInFrames={14}>
                <Audio src={staticFile("audio/ctrl_wala/sfx/whoosh.wav")} volume={0.4} />
              </Sequence>
            )}

            {/* UI Pop chime on card reveal */}
            {idx > 0 && (
              <Sequence from={scene.startFrame + 4} durationInFrames={10}>
                <Audio src={staticFile("audio/ctrl_wala/sfx/ui_pop.wav")} volume={0.5} />
              </Sequence>
            )}

            {/* Mechanical keyboard clack series on code/benchmark scene */}
            {isCodeScene && (
              <>
                <Sequence from={scene.startFrame + 15} durationInFrames={8}>
                  <Audio src={staticFile("audio/ctrl_wala/sfx/key_tap.wav")} volume={0.35} />
                </Sequence>
                <Sequence from={scene.startFrame + 25} durationInFrames={8}>
                  <Audio src={staticFile("audio/ctrl_wala/sfx/key_tap.wav")} volume={0.35} />
                </Sequence>
                <Sequence from={scene.startFrame + 35} durationInFrames={8}>
                  <Audio src={staticFile("audio/ctrl_wala/sfx/key_tap.wav")} volume={0.35} />
                </Sequence>
              </>
            )}

            {/* Success chime on CTA */}
            {isCta && (
              <Sequence from={scene.startFrame + 8} durationInFrames={25}>
                <Audio src={staticFile("audio/ctrl_wala/sfx/success_chime.wav")} volume={0.65} />
              </Sequence>
            )}

            {/* Scene Hinglish Voiceover Narration */}
            <Sequence from={scene.startFrame} durationInFrames={scene.durationFrames}>
              <Audio src={staticFile(scene.audioFile)} volume={1.0} />
            </Sequence>
          </React.Fragment>
        );
      })}
    </>
  );
};
