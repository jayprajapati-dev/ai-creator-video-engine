/**
 * THE UNKNOWN CITY — Episode 02 Master Composition
 * "B1 पर आरव का इंतज़ार कौन कर रहा था?"
 *
 * Configurable branching:
 * - Branch A: CCTV Room Route (Option A)
 * - Branch B: Elevator Descent (Option B)
 * Controlled via episode2Config.winningBranch ("A" | "B")
 */

import React from "react";
import { Audio, Sequence, staticFile } from "remotion";
import { episode2Config } from "./episode2Config";
import { Ep2Scene1Hook } from "./scenes/Ep2Scene1Hook";
import { Ep2Scene2BranchA_CCTV } from "./scenes/Ep2Scene2BranchA_CCTV";
import { Ep2Scene2BranchB_Lift } from "./scenes/Ep2Scene2BranchB_Lift";
import { Ep2Scene3BasementDiscovery } from "./scenes/Ep2Scene3BasementDiscovery";
import { Ep2Scene4VisitorRegister } from "./scenes/Ep2Scene4VisitorRegister";
import { Ep2Scene5CCTVTwist } from "./scenes/Ep2Scene5CCTVTwist";
import { Ep2Scene6Cliffhanger } from "./scenes/Ep2Scene6Cliffhanger";

export const HindiReelEp02: React.FC = () => {
  const { scenes, audio, winningBranch } = episode2Config;
  const branchScene = winningBranch === "A" ? scenes.branchA : scenes.branchB;

  return (
    <div
      style={{
        position: "relative",
        width: 1080,
        height: 1920,
        backgroundColor: "#020408",
        overflow: "hidden",
      }}
    >
      {/* ── Layer 1: Ambient Basement Resonance Drone (Loop) ─── */}
      <Audio src={staticFile(audio.basementDrone)} volume={0.22} loop />

      {/* ── Layer 2 & 3: Foley & Environmental Sound Effects ─── */}
      {/* Concrete Footsteps as Aarav enters B1 (Scene 3) */}
      <Sequence from={540} durationInFrames={120}>
        <Audio src={staticFile(audio.concreteFootsteps)} volume={0.65} />
      </Sequence>

      {/* Registry Book Page Rustle (Scene 4) */}
      <Sequence from={820} durationInFrames={40}>
        <Audio src={staticFile(audio.pageTurn)} volume={0.8} />
      </Sequence>

      {/* Surveillance Monitor CRT Power Whine (Scene 5) */}
      <Sequence from={1110} durationInFrames={50}>
        <Audio src={staticFile(audio.monitorCrtPower)} volume={0.75} />
      </Sequence>

      {/* Smartphone Dual-Pulse Vibration (Scene 6) */}
      <Sequence from={1620} durationInFrames={45}>
        <Audio src={staticFile(audio.phoneSmsVibe)} volume={0.85} />
      </Sequence>

      {/* Distant Elevator Bell Ding (Scene 6) */}
      <Sequence from={1740} durationInFrames={45}>
        <Audio src={staticFile(audio.elevatorBell)} volume={0.9} />
      </Sequence>

      {/* Climax Heartbeat Strobe (Scene 6) */}
      <Sequence from={1740} durationInFrames={60}>
        <Audio src={staticFile(audio.heartbeat)} volume={0.7} />
      </Sequence>

      {/* ── SCENE 1: HOOK (0–120 frames, 0–4s) ──────────────── */}
      <Sequence from={scenes.hook.startFrame} durationInFrames={scenes.hook.durationFrames} name={scenes.hook.id}>
        <Audio src={staticFile(scenes.hook.audioFile)} volume={1.0} />
        <Ep2Scene1Hook scene={scenes.hook} />
      </Sequence>

      {/* ── SCENE 2: AUDIENCE CHOICE CONSEQUENCE (120–330, 4–11s) */}
      <Sequence from={branchScene.startFrame} durationInFrames={branchScene.durationFrames} name={branchScene.id}>
        <Audio src={staticFile(branchScene.audioFile)} volume={1.0} />
        {winningBranch === "A" ? (
          <Ep2Scene2BranchA_CCTV scene={scenes.branchA} />
        ) : (
          <Ep2Scene2BranchB_Lift scene={scenes.branchB} />
        )}
      </Sequence>

      {/* ── SCENE 3: BASEMENT DISCOVERY (330–690, 11–23s) ────── */}
      <Sequence from={scenes.basement.startFrame} durationInFrames={scenes.basement.durationFrames} name={scenes.basement.id}>
        <Audio src={staticFile(scenes.basement.audioFile)} volume={1.0} />
        <Ep2Scene3BasementDiscovery scene={scenes.basement} />
      </Sequence>

      {/* ── SCENE 4: VISITOR REGISTER (690–1050, 23–35s) ─────── */}
      <Sequence from={scenes.register.startFrame} durationInFrames={scenes.register.durationFrames} name={scenes.register.id}>
        <Audio src={staticFile(scenes.register.audioFile)} volume={1.0} />
        <Ep2Scene4VisitorRegister scene={scenes.register} />
      </Sequence>

      {/* ── SCENE 5: CCTV TWIST (1050–1470, 35–49s) ──────────── */}
      <Sequence from={scenes.cctvTwist.startFrame} durationInFrames={scenes.cctvTwist.durationFrames} name={scenes.cctvTwist.id}>
        <Audio src={staticFile(scenes.cctvTwist.audioFile)} volume={1.0} />
        <Ep2Scene5CCTVTwist scene={scenes.cctvTwist} />
      </Sequence>

      {/* ── SCENE 6: FINAL CLIFFHANGER (1470–1800, 49–60s) ───── */}
      <Sequence from={scenes.cliffhanger.startFrame} durationInFrames={scenes.cliffhanger.durationFrames} name={scenes.cliffhanger.id}>
        <Audio src={staticFile(scenes.cliffhanger.audioFile)} volume={1.0} />
        <Ep2Scene6Cliffhanger scene={scenes.cliffhanger} />
      </Sequence>
    </div>
  );
};

