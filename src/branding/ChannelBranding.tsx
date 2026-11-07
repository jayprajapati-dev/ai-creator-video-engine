import React from "react";
import { Img, staticFile } from "remotion";
import { FONTS } from "../ctrl_wala/designSystem";

/**
 * Official CTRL_WALA Profile Picture (Logo)
 * 800 x 800 px (1:1 Ratio, Circular Crop Safe)
 */
export const ChannelLogo: React.FC = () => {
  return (
    <div
      style={{
        width: 800,
        height: 800,
        backgroundColor: "#050811",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Ambient Cyber Glow */}
      <div
        style={{
          position: "absolute",
          width: 700,
          height: 700,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(139, 92, 246, 0.4) 0%, rgba(0, 242, 254, 0.2) 50%, transparent 75%)",
          filter: "blur(40px)",
        }}
      />

      {/* Mascot Logo Asset */}
      <Img
        src={staticFile("ctrl_wala/logo.png")}
        style={{
          width: 760,
          height: 760,
          objectFit: "contain",
          position: "relative",
          zIndex: 2,
          filter: "drop-shadow(0 0 35px rgba(139, 92, 246, 0.6))",
        }}
      />
    </div>
  );
};

/**
 * Official CTRL_WALA YouTube Channel Banner
 * 2560 x 1440 px (Safe Area: 1546 x 423)
 */
export const YouTubeBanner: React.FC = () => {
  return (
    <div
      style={{
        width: 2560,
        height: 1440,
        backgroundColor: "#060A14",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: FONTS.display,
      }}
    >
      {/* Background Cyber Grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          opacity: 0.6,
        }}
      />

      {/* Ambient Neon Blobs */}
      <div
        style={{
          position: "absolute",
          left: 300,
          top: 300,
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(139, 92, 246, 0.25) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          right: 300,
          bottom: 300,
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0, 242, 254, 0.25) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      {/* Central Banner Safe Zone (1546 x 423) */}
      <div
        style={{
          width: 1546,
          height: 423,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 80px",
          position: "relative",
          zIndex: 5,
        }}
      >
        {/* Left: Mascot Avatar Badge */}
        <div style={{ display: "flex", alignItems: "center", gap: 40 }}>
          <div
            style={{
              width: 320,
              height: 320,
              borderRadius: "50%",
              border: "4px solid #8B5CF6",
              boxShadow: "0 0 40px rgba(139, 92, 246, 0.8)",
              overflow: "hidden",
              backgroundColor: "#0A0F1D",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Img
              src={staticFile("ctrl_wala/logo.png")}
              style={{
                width: 320,
                height: 320,
                objectFit: "contain",
              }}
            />
          </div>

          {/* Brand Identity & Taglines */}
          <div>
            <div
              style={{
                fontSize: 88,
                fontWeight: 900,
                letterSpacing: "-0.03em",
                background: "linear-gradient(90deg, #FFFFFF 0%, #00F2FE 50%, #8B5CF6 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                lineHeight: 1,
                marginBottom: 16,
              }}
            >
              CTRL_WALA
            </div>
            <div
              style={{
                fontSize: 28,
                fontWeight: 700,
                color: "#FCD34D",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                marginBottom: 12,
              }}
            >
              TECH • AI • TOOLS • BUILDS
            </div>
            <div
              style={{
                fontSize: 20,
                color: "#94A3B8",
                letterSpacing: "0.05em",
                fontFamily: FONTS.code,
              }}
            >
              Daily High-Impact Reels & Production AI Workflows
            </div>
          </div>
        </div>

        {/* Right: Key Badges */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 16,
            alignItems: "flex-end",
          }}
        >
          <div
            style={{
              background: "rgba(139, 92, 246, 0.15)",
              border: "1px solid #8B5CF6",
              borderRadius: 999,
              padding: "10px 28px",
              color: "#A78BFA",
              fontSize: 18,
              fontWeight: 700,
              fontFamily: FONTS.code,
              boxShadow: "0 0 16px rgba(139, 92, 246, 0.3)",
            }}
          >
            &gt;_ AUTOMATE EVERYTHING
          </div>
          <div
            style={{
              background: "rgba(0, 242, 254, 0.15)",
              border: "1px solid #00F2FE",
              borderRadius: 999,
              padding: "10px 28px",
              color: "#00F2FE",
              fontSize: 18,
              fontWeight: 700,
              fontFamily: FONTS.code,
              boxShadow: "0 0 16px rgba(0, 242, 254, 0.3)",
            }}
          >
            [ AI / LLMs / NEXT.JS ]
          </div>
        </div>
      </div>
    </div>
  );
};
