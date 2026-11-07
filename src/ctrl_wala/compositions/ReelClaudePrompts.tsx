import React from "react";
import { DynamicReelEngine } from "../engine/DynamicReelEngine";
import { claudePromptsBlueprint } from "../blueprints/claudePromptsBlueprint";

export const ReelClaudePrompts: React.FC = () => {
  return <DynamicReelEngine blueprint={claudePromptsBlueprint} />;
};

