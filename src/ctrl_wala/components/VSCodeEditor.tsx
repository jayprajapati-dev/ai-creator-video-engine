/**
 * CTRL_WALA — VSCodeEditor Component (Version 3.0 - Vector Icons)
 *
 * Detailed VS Code-style developer environment:
 *  - 3.5px solid #18181B outline + 0 8px 0px #18181B retro shadow
 *  - File explorer sidebar with icons
 *  - Tab bar with multiple files
 *  - Syntax-highlighted code with line numbers
 *  - Integrated animated terminal at bottom with vector terminal icons
 */

import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { LIGHT_FONTS } from "../designSystem/lightTypography";
import { TerminalIcon, FolderIcon, FileCodeIcon } from "./Icons";

export interface CodeEditorFile {
  name: string;
  language?: string;
  lines: string[];
  activeLine?: number;
}

export interface TerminalCommand {
  command: string;
  output?: string;
  type?: "success" | "error" | "info" | "default";
}

interface VSCodeEditorProps {
  files: CodeEditorFile[];
  activeFileIndex?: number;
  terminalCommands?: TerminalCommand[];
  startFrame?: number;
  framesPerLine?: number;
  showTerminal?: boolean;
  showExplorer?: boolean;
  delay?: number;
}

const colorizeCode = (line: string): React.ReactNode => {
  if (!line.trim()) return <span> </span>;

  const commentIdx = line.indexOf("#");
  if (commentIdx >= 0) {
    const code = line.slice(0, commentIdx);
    const comment = line.slice(commentIdx);
    return (
      <>
        {colorizeCode(code)}
        <span style={{ color: "#6A9955" }}>{comment}</span>
      </>
    );
  }

  return (
    <span>
      {line.split(/(["'`][^"'`]*["'`]|\b(?:import|from|def|return|class|if|else|for|while|const|let|var|function|export|type|interface|async|await)\b|\b\d+\b)/g).map((part, i) => {
        if (/^["'`]/.test(part)) return <span key={i} style={{ color: "#CE9178" }}>{part}</span>;
        if (/^\b(import|from|def|return|class|if|else|for|while|const|let|var|function|export|type|interface|async|await)\b$/.test(part))
          return <span key={i} style={{ color: "#569CD6", fontWeight: 700 }}>{part}</span>;
        if (/^\d+$/.test(part)) return <span key={i} style={{ color: "#B5CEA8" }}>{part}</span>;
        return <span key={i} style={{ color: "#D4D4D4" }}>{part}</span>;
      })}
    </span>
  );
};

export const VSCodeEditor: React.FC<VSCodeEditorProps> = ({
  files,
  activeFileIndex = 0,
  terminalCommands = [],
  startFrame = 0,
  framesPerLine = 14,
  showTerminal = true,
  showExplorer = true,
  delay = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const f = Math.max(0, frame - delay);
  const entrance = spring({ frame: f, fps, config: { stiffness: 220, damping: 22 } });
  const opacity = interpolate(entrance, [0, 0.4], [0, 1], { extrapolateRight: "clamp" });
  const translateY = interpolate(entrance, [0, 1], [30, 0]);

  const activeFile = files[activeFileIndex] ?? files[0];
  if (!activeFile) return null;

  const linesVisible = Math.floor((frame - startFrame) / framesPerLine) + 1;
  const cursorLine = Math.min(linesVisible, activeFile.lines.length);
  const showCursor = frame % 20 < 10;

  return (
    <div
      style={{
        backgroundColor: "#1E1E1E",
        border: "3.5px solid #18181B",
        borderRadius: 22,
        overflow: "hidden",
        boxShadow: "0 8px 0px #18181B",
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: 540,
        transform: `translateY(${translateY}px)`,
        opacity,
      }}
    >
      {/* ── Title bar with macOS dots ── */}
      <div
        style={{
          backgroundColor: "#333333",
          borderBottom: "2px solid #252526",
          paddingLeft: 18,
          paddingRight: 18,
          paddingTop: 10,
          paddingBottom: 10,
          display: "flex",
          alignItems: "center",
          gap: 12,
          flexShrink: 0,
        }}
      >
        <div style={{ display: "flex", gap: 7 }}>
          {["#FF5F56", "#FFBD2E", "#27C93F"].map((color, i) => (
            <div
              key={i}
              style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: color }}
            />
          ))}
        </div>
        <span
          style={{
            fontFamily: LIGHT_FONTS.code,
            fontSize: 16,
            fontWeight: 700,
            color: "#CCCCCC",
            marginLeft: 6,
          }}
        >
          {activeFile.name} — VS Code
        </span>
      </div>

      {/* ── Tab bar ── */}
      <div
        style={{
          display: "flex",
          backgroundColor: "#252526",
          borderBottom: "1px solid #1E1E1E",
          flexShrink: 0,
        }}
      >
        {files.slice(0, 3).map((file, i) => (
          <div
            key={i}
            style={{
              padding: "10px 20px",
              fontFamily: LIGHT_FONTS.code,
              fontSize: 16,
              fontWeight: i === activeFileIndex ? 700 : 400,
              color: i === activeFileIndex ? "#FFFFFF" : "#888888",
              backgroundColor: i === activeFileIndex ? "#1E1E1E" : "transparent",
              borderRight: "1px solid #333333",
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <FileCodeIcon size={16} color={i === activeFileIndex ? "#57C7FF" : "#888888"} />
            {file.name}
          </div>
        ))}
      </div>

      {/* ── Main editor body ── */}
      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        {showExplorer && (
          <div
            style={{
              width: 170,
              backgroundColor: "#252526",
              borderRight: "1px solid #333333",
              padding: "10px 0",
              flexShrink: 0,
            }}
          >
            <div
              style={{
                padding: "4px 16px",
                fontSize: 12,
                fontWeight: 800,
                color: "#AAAAAA",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                fontFamily: LIGHT_FONTS.body,
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              <FolderIcon size={14} color="#AAAAAA" />
              EXPLORER
            </div>
            <div style={{ marginTop: 8 }}>
              {files.map((file, i) => (
                <div
                  key={i}
                  style={{
                    padding: "6px 20px",
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    backgroundColor: i === activeFileIndex ? "#37373D" : "transparent",
                    fontFamily: LIGHT_FONTS.code,
                    fontSize: 15,
                    fontWeight: 600,
                    color: i === activeFileIndex ? "#FFFFFF" : "#CCCCCC",
                  }}
                >
                  <FileCodeIcon size={14} color={i === activeFileIndex ? "#57C7FF" : "#999999"} />
                  {file.name}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Code Lines */}
        <div
          style={{
            flex: 1,
            backgroundColor: "#1E1E1E",
            padding: "14px 0",
            overflowY: "hidden",
            fontFamily: LIGHT_FONTS.code,
            fontSize: 20,
            lineHeight: 1.65,
          }}
        >
          {activeFile.lines.slice(0, Math.max(1, linesVisible)).map((line, i) => {
            const lineNum = i + 1;
            const isActive = lineNum === activeFile.activeLine;
            const isCursor = lineNum === cursorLine && linesVisible <= activeFile.lines.length;

            return (
              <div
                key={i}
                style={{
                  display: "flex",
                  backgroundColor: isActive ? "rgba(255, 142, 96, 0.15)" : "transparent",
                  borderLeft: isActive ? "3.5px solid #FF8E60" : "3.5px solid transparent",
                  paddingRight: 20,
                }}
              >
                <span
                  style={{
                    width: 48,
                    textAlign: "right",
                    paddingRight: 16,
                    color: isActive ? "#FF8E60" : "#6E7681",
                    flexShrink: 0,
                    userSelect: "none",
                    fontSize: 16,
                    fontWeight: 600,
                  }}
                >
                  {lineNum}
                </span>
                <span>
                  {colorizeCode(line)}
                  {isCursor && showCursor && (
                    <span
                      style={{
                        display: "inline-block",
                        width: 3,
                        height: "1em",
                        backgroundColor: "#57C7FF",
                        marginLeft: 2,
                        verticalAlign: "text-bottom",
                      }}
                    />
                  )}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Terminal at bottom with TerminalIcon ── */}
      {showTerminal && terminalCommands.length > 0 && (
        <div
          style={{
            height: 140,
            backgroundColor: "#0D1117",
            borderTop: "2px solid #30363D",
            padding: "10px 18px",
            fontFamily: LIGHT_FONTS.code,
            fontSize: 17,
            lineHeight: 1.5,
            flexShrink: 0,
          }}
        >
          <div
            style={{
              fontSize: 12,
              color: "#8B949E",
              fontWeight: 800,
              letterSpacing: "0.08em",
              marginBottom: 6,
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <TerminalIcon size={14} color="#8B949E" />
            TERMINAL
          </div>
          {terminalCommands.map((cmd, i) => (
            <div key={i} style={{ marginBottom: 4 }}>
              <div>
                <span style={{ color: "#58A6FF", fontWeight: 700 }}>❯ </span>
                <span style={{ color: "#F0F6FC", fontWeight: 600 }}>{cmd.command}</span>
              </div>
              {cmd.output && (
                <div
                  style={{
                    color: cmd.type === "success" ? "#3FB950" : cmd.type === "error" ? "#F85149" : "#C9D1D9",
                    paddingLeft: 18,
                    fontWeight: 600,
                  }}
                >
                  {cmd.output}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
