import React from "react";
import { Img, staticFile } from "remotion";
import { FONTS } from "../ctrl_wala/designSystem";

/**
 * High-CTR YouTube Video Thumbnail — 1920 x 1080 (16:9 Standard)
 * Designed for Maximum Click-Through Rate for Tech & AI Audiences
 */
export const Thumbnail16x9: React.FC = () => {
  return (
    <div
      style={{
        width: 1920,
        height: 1080,
        backgroundColor: "#050811",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 100px",
        fontFamily: FONTS.display,
      }}
    >
      {/* Background Cyber Grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            radial-gradient(circle at 75% 50%, rgba(139, 92, 246, 0.25) 0%, transparent 55%),
            radial-gradient(circle at 25% 50%, rgba(0, 242, 254, 0.2) 0%, transparent 55%)
          `,
        }}
      />

      {/* Left: Punchy Hook Text & Badges */}
      <div style={{ maxWidth: 1000, position: "relative", zIndex: 10 }}>
        {/* Category Pill */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 12,
            background: "rgba(0, 242, 254, 0.15)",
            border: "2px solid #00F2FE",
            borderRadius: 999,
            padding: "8px 24px",
            color: "#00F2FE",
            fontSize: 24,
            fontWeight: 800,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            marginBottom: 28,
            boxShadow: "0 0 20px rgba(0, 242, 254, 0.4)",
          }}
        >
          <span>🔥</span> NEW AI BREAKTHROUGH
        </div>

        {/* Massive Headline */}
        <div
          style={{
            fontSize: 108,
            fontWeight: 900,
            lineHeight: 1.05,
            letterSpacing: "-0.04em",
            color: "#FFFFFF",
            textShadow: "0 10px 40px rgba(0,0,0,0.8)",
            marginBottom: 24,
          }}
        >
          DEEPSEEK V3 <br />
          <span
            style={{
              background: "linear-gradient(90deg, #FCD34D 0%, #F59E0B 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            OpenAI DESTROYED?
          </span>
        </div>

        {/* Stat Pill */}
        <div style={{ display: "flex", gap: 20 }}>
          <div
            style={{
              background: "#10B981",
              color: "#000000",
              fontWeight: 900,
              fontSize: 32,
              padding: "12px 28px",
              borderRadius: 16,
              boxShadow: "0 0 30px rgba(16, 185, 129, 0.5)",
            }}
          >
            95% CHEAPER
          </div>
          <div
            style={{
              background: "rgba(255, 255, 255, 0.1)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              color: "#FFFFFF",
              fontWeight: 700,
              fontSize: 32,
              padding: "12px 28px",
              borderRadius: 16,
              backdropFilter: "blur(10px)",
            }}
          >
            100% OPEN WEIGHTS
          </div>
        </div>
      </div>

      {/* Right: Giant Mascot Avatar */}
      <div
        style={{
          position: "relative",
          zIndex: 5,
          width: 650,
          height: 650,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            position: "absolute",
            width: 600,
            height: 600,
            borderRadius: "50%",
            border: "8px solid #8B5CF6",
            boxShadow: "0 0 80px rgba(139, 92, 246, 0.8)",
            background: "#080D1A",
            overflow: "hidden",
          }}
        >
          <Img
            src={staticFile("ctrl_wala/logo.png")}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
            }}
          />
        </div>
      </div>
    </div>
  );
};
