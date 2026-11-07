/**
 * CTRL_WALA — DotBackground Component
 *
 * Renders the light grey dotted background texture, identical to the
 * Techstackbro reference style. Pure CSS — no image dependency.
 */

import React from "react";
import { LIGHT } from "../designSystem/lightTheme";

interface DotBackgroundProps {
  dotColor?: string;
  dotSize?: number;
  dotGap?: number;
  bgColor?: string;
}

export const DotBackground: React.FC<DotBackgroundProps> = ({
  dotColor = LIGHT.dot.color,
  dotSize = LIGHT.dot.size,
  dotGap = LIGHT.dot.gap,
  bgColor = LIGHT.bg.base,
}) => {
  const svgDot = `<svg xmlns='http://www.w3.org/2000/svg' width='${dotGap}' height='${dotGap}'><circle cx='${dotGap / 2}' cy='${dotGap / 2}' r='${dotSize}' fill='${dotColor}'/></svg>`;
  const encoded = `data:image/svg+xml;utf8,${encodeURIComponent(svgDot)}`;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        backgroundColor: bgColor,
        backgroundImage: `url("${encoded}")`,
        backgroundRepeat: "repeat",
        backgroundSize: `${dotGap}px ${dotGap}px`,
      }}
    />
  );
};

