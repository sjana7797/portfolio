import type { IconType } from "react-icons";
export type SkillType =
  | "frontend"
  | "backend"
  | "design"
  | "database"
  | "tools";

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
