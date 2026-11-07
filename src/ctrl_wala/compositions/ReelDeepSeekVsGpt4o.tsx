import React from "react";
import { DynamicReelEngine } from "../engine/DynamicReelEngine";
import { deepseekBlueprint } from "../blueprints/deepseekBlueprint";

export const ReelDeepSeekVsGpt4o: React.FC = () => {
  return <DynamicReelEngine blueprint={deepseekBlueprint} />;
};

