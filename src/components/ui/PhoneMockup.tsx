import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";

interface PhoneMockupProps {
  batteryPercent?: number; // e.g. 1
  isGlitching?: boolean;
  isDead?: boolean;
  scale?: number;
}

export const PhoneMockup: React.FC<PhoneMockupProps> = ({
  batteryPercent = 1,
  isGlitching = false,
  isDead = false,
  scale = 1,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance spring pop
  const pop = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 120 },
  });

  // Battery blinking alert
  const isBatteryBlink = frame % 20 < 10;

  // Glitch jitter
  const jitterX = isGlitching ? (frame % 3 === 0 ? 6 : -6) : 0;
  const jitterY = isGlitching ? (frame % 2 === 0 ? -4 : 4) : 0;

  return (
    <div
      style={{
        transformOrigin: "center center",
        transform: `scale(${pop * scale}) translate(${jitterX}px, ${jitterY}px)`,
        filter: isGlitching
          ? "drop-shadow(0 20px 40px rgba(230,57,70,0.5))"
          : "drop-shadow(0 30px 60px rgba(0,0,0,0.35))",
      }}
    >
      {/* Phone Body */}
      <div
        style={{
          width: 360,
          height: 720,
          borderRadius: 54,
          backgroundColor: "#18181B",
          border: "8px solid #27272A",
          boxShadow: "inset 0 0 0 3px #09090B, 0 25px 50px -12px rgba(0,0,0,0.6)",
          position: "relative",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "24px 20px",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        {/* Dynamic Island / Speaker Notch */}
        <div
          style={{
            position: "absolute",
            top: 14,
            left: "50%",
            transform: "translateX(-50%)",
            width: 110,
            height: 28,
            backgroundColor: "#000000",
            borderRadius: 20,
            zIndex: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              backgroundColor: "#1E293B",
              marginRight: 6,
            }}
          />
        </div>

        {/* SCREEN CONTENT */}
        {isDead ? (
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "#000000",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* Low Battery Spinner / Off Symbol */}
            <div
              style={{
                width: 60,
                height: 100,
                border: "4px solid #333333",
                borderRadius: 8,
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: -12,
                  width: 24,
                  height: 8,
                  backgroundColor: "#333333",
                  borderRadius: 3,
                }}
              />
              <div
                style={{
                  color: "#EF4444",
                  fontSize: 28,
                  fontWeight: 900,
                }}
              >
                !
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Top Status Bar */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                color: "#FFFFFF",
                fontSize: 14,
                fontWeight: 600,
                marginTop: 10,
                zIndex: 5,
              }}
            >
              <span>21:38</span>

              {/* Service & Battery Indicator */}
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                {/* NO SERVICE Tag */}
                <span
                  style={{
                    backgroundColor: "#EF4444",
                    color: "#FFFFFF",
                    fontSize: 10,
                    fontWeight: 800,
                    padding: "2px 6px",
                    borderRadius: 4,
                    letterSpacing: 0.5,
                  }}
                >
                  NO SERVICE
                </span>

                {/* Battery Icon */}
                <div
                  style={{
                    width: 32,
                    height: 16,
                    border: "2px solid #FFFFFF",
                    borderRadius: 4,
                    padding: 2,
                    display: "flex",
                    alignItems: "center",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      width: "12%",
                      backgroundColor: isBatteryBlink ? "#EF4444" : "transparent",
                      borderRadius: 1,
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      right: -4,
                      top: 4,
                      width: 2,
                      height: 6,
                      backgroundColor: "#FFFFFF",
                      borderRadius: "0 1px 1px 0",
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Lock Screen Middle: Clock & Alerts */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 16,
                zIndex: 5,
              }}
            >
              <div
                style={{
                  fontSize: 68,
                  fontWeight: 800,
                  color: "#FFFFFF",
                  letterSpacing: -2,
                  lineHeight: 1,
                }}
              >
                21:38
              </div>
              <div
                style={{
                  fontSize: 15,
                  color: "#94A3B8",
                  fontWeight: 600,
                  letterSpacing: 1,
                  textTransform: "uppercase",
                }}
              >
                Friday, Oct 31
              </div>

              {/* Critical Alert Card */}
              <div
                style={{
                  width: "100%",
                  backgroundColor: "rgba(239, 68, 68, 0.15)",
                  border: "1.5px solid rgba(239, 68, 68, 0.5)",
                  borderRadius: 18,
                  padding: "16px 14px",
                  backdropFilter: "blur(12px)",
                  display: "flex",
                  flexDirection: "column",
                  gap: 6,
                  marginTop: 20,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    color: "#F87171",
                    fontSize: 12,
                    fontWeight: 700,
                  }}
                >
                  <span style={{ fontSize: 16 }}>⚠️</span>
                  <span>BATTERY CRITICAL ({batteryPercent}%)</span>
                </div>
                <div
                  style={{
                    color: "#FFFFFF",
                    fontSize: 13,
                    fontWeight: 500,
                    lineHeight: 1.3,
                  }}
                >
                  Cell towers unreachable. Emergency calls only.
                </div>
              </div>
            </div>

            {/* Bottom Camera / Flashlight shortcuts */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "0 10px",
                zIndex: 5,
              }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 24,
                  backgroundColor: "rgba(255,255,255,0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#FFFFFF",
                  fontSize: 20,
                }}
              >
                🔦
              </div>
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 24,
                  backgroundColor: "rgba(255,255,255,0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#FFFFFF",
                  fontSize: 20,
                }}
              >
                📷
              </div>
            </div>
          </>
        )}

        {/* Scanline Glitch Effect */}
        {isGlitching && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "repeating-linear-gradient(0deg, rgba(255,255,255,0.2) 0px, transparent 2px, transparent 4px)",
              pointerEvents: "none",
              zIndex: 20,
              mixBlendMode: "overlay",
            }}
          />
        )}
      </div>
    </div>
  );
};
