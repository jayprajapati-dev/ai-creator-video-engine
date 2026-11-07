/**
 * CTRL_WALA — TopBrandHeader Component
 *
 * Top center channel branding seen in the Techstackbro reference:
 *  - Circular avatar emblem (CTRL_WALA Mascot) with bold border
 *  - Episode pill badge right below it (e.g. "01", "15")
 *  - Instagram Reels top-bar safe (starts around y = 60px)
 */

import React from "react";
import { Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { LIGHT } from "../designSystem/lightTheme";
import { LIGHT_FONTS, LIGHT_FONT_WEIGHT } from "../designSystem/lightTypography";

interface TopBrandHeaderProps {
  episodeNumber?: string | number;
  delay?: number;
}

export const TopBrandHeader: React.FC<TopBrandHeaderProps> = ({
  episodeNumber = "01",
  delay = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const f = Math.max(0, frame - delay);
  const entrance = spring({
    frame: f,
    fps,
    config: { stiffness: 260, damping: 20 },
  });

  const translateY = interpolate(entrance, [0, 1], [-40, 0]);
  const opacity = interpolate(entrance, [0, 0.4], [0, 1], { extrapolateRight: "clamp" });
  const scale = interpolate(entrance, [0, 1], [0.8, 1]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        transform: `translateY(${translateY}px) scale(${scale})`,
        opacity,
        zIndex: 50,
      }}
    >
      {/* Outer circular avatar */}
      <div
        style={{
          width: 90,
          height: 90,
          borderRadius: "50%",
          backgroundColor: "#8A5333", // warm brown avatar circle like reference
          border: `3.5px solid ${LIGHT.border.card}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
          position: "relative",
        }}
      >
        <Img
          src={staticFile("ctrl_wala/logo.png")}
          style={{
            width: "82%",
            height: "82%",
            objectFit: "contain",
          }}
        />
      </div>

      {/* Episode number badge below avatar */}
      <div
        style={{
          backgroundColor: "#FFFFFF",
          border: `3px solid #6E3F25`,
          borderRadius: 100,
          paddingLeft: 14,
          paddingRight: 14,
          paddingTop: 2,
          paddingBottom: 2,
          marginTop: -16,
          boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
          zIndex: 2,
        }}
      >
        <span
          style={{
            fontFamily: LIGHT_FONTS.body,
            fontSize: 18,
            fontWeight: LIGHT_FONT_WEIGHT.black,
            color: "#6E3F25",
            letterSpacing: "-0.02em",
          }}
        >
          {episodeNumber}
        </span>
      </div>
    </div>
  );
};
