import React from "react";
import { useCurrentFrame } from "remotion";

interface GridBackgroundProps {
  darkProgress?: number; // 0 = warm cream editorial, 1 = deep midnight noir
}

export const GridBackground: React.FC<GridBackgroundProps> = ({
  darkProgress = 0,
}) => {
  const frame = useCurrentFrame();

  // Subtle ambient pulse for background grid
  const gridOpacity = 0.08 + 0.03 * Math.sin(frame * 0.05);

  // Background color interpolation from warm cream to dark navy
  const cream = "rgb(247, 244, 238)";

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        backgroundColor: darkProgress > 0 ? undefined : cream,
        background:
          darkProgress > 0
            ? `linear-gradient(180deg, 
                rgb(${Math.round(247 * (1 - darkProgress) + 11 * darkProgress)}, 
                    ${Math.round(244 * (1 - darkProgress) + 15 * darkProgress)}, 
                    ${Math.round(238 * (1 - darkProgress) + 25 * darkProgress)}), 
                rgb(${Math.round(240 * (1 - darkProgress) + 6 * darkProgress)}, 
                    ${Math.round(236 * (1 - darkProgress) + 9 * darkProgress)}, 
                    ${Math.round(230 * (1 - darkProgress) + 16 * darkProgress)}))`
            : cream,
        overflow: "hidden",
        zIndex: 0,
      }}
    >
      {/* Editorial Grid Lines */}
      <svg
        width="100%"
        height="100%"
        style={{
          position: "absolute",
          inset: 0,
          opacity: darkProgress > 0.5 ? 0.12 : gridOpacity,
          pointerEvents: "none",
        }}
      >
        <defs>
          <pattern
            id="editorialGrid"
            width="60"
            height="60"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 60 0 L 0 0 0 60"
              fill="none"
              stroke={darkProgress > 0.5 ? "#60A5FA" : "#111111"}
              strokeWidth="1.2"
            />
          </pattern>
          {/* Subtle dot pattern at intersections */}
          <pattern
            id="dotGrid"
            width="180"
            height="180"
            patternUnits="userSpaceOnUse"
          >
            <circle
              cx="0"
              cy="0"
              r="2.5"
              fill={darkProgress > 0.5 ? "#E63946" : "#E76F51"}
            />
          </pattern>
        </defs>

        <rect width="100%" height="100%" fill="url(#editorialGrid)" />
        <rect width="100%" height="100%" fill="url(#dotGrid)" />
      </svg>

      {/* Subtle Vignette */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            darkProgress > 0.3
              ? "radial-gradient(circle at center, transparent 40%, rgba(0,0,0,0.85) 100%)"
              : "radial-gradient(circle at center, transparent 65%, rgba(0,0,0,0.06) 100%)",
          pointerEvents: "none",
        }}
      />
    </div>
  );
};
