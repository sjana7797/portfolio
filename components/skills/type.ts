import type { IconType } from "react-icons";

export const skillsTypes = [
  "frontend",
  "backend",
  "design",
  "database",
  "tools",
] as const;

export type SkillType = (typeof skillsTypes)[number];
export type Skill = {
  id: string;
  name: string;
  Icon: IconType;
  level: number;
  description: string;
  color: string;
  type: SkillType;
};

export type SkillsMap = Map<SkillType, Skill["type"][]>;
