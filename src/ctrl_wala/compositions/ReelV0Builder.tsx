import React from "react";
import { DynamicReelEngine } from "../engine/DynamicReelEngine";
import { v0BuilderBlueprint } from "../blueprints/v0BuilderBlueprint";

export const ReelV0Builder: React.FC = () => {
  return <DynamicReelEngine blueprint={v0BuilderBlueprint} />;
};

