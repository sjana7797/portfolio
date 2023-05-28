import { IconType } from "react-icons";
import {
  SiNextdotjs,
  SiTailwindcss,
  SiJavascript,
  SiMongodb,
  SiReact,
  SiNodedotjs,
  SiCss3,
  SiHtml5,
  SiC,
  SiSass,
  SiGit,
  SiBootstrap,
} from "react-icons/si";

export type Skill = {
  Icon: IconType;
  name: string;
  color: string;
};
export const skills: Skill[] = [
  {
    Icon: SiReact,
    name: "React",
    color: "bg-blue-400/95 text-blue-100/70",
  },
  {
    Icon: SiNodedotjs,
    name: "Node",
    color: "bg-emerald-300/95 text-emerald-100/70",
  },
  {
    Icon: SiNextdotjs,
    name: "Next",
    color: "bg-black/95 text-gray-100/70",
  },
  {
    Icon: SiTailwindcss,
    name: "Tailwind CSS",
    color: "bg-cyan-300/95 text-cyan-100/70",
  },
  {
    Icon: SiJavascript,
    name: "Javascript",
    color: "bg-yellow-300/95 text-yellow-100/70",
  },
  {
    Icon: SiMongodb,
    name: "MongoDB",
    color: "bg-green-400/95 text-green-100/70",
  },
  {
    Icon: SiHtml5,
    name: "HTML 5",
    color: "bg-orange-400/95 text-orange-100/70",
  },
  {
    Icon: SiCss3,
    name: "CSS 3",
    color: "bg-blue-400/95 text-blue-100/70",
  },
  {
    Icon: SiSass,
    name: "Sass",
    color: "bg-pink-400/95 text-pink-100/70",
  },
  {
    Icon: SiGit,
    name: "Git",
    color: "bg-red-400/95 text-red-100/70",
  },
  {
    Icon: SiC,
    name: "C",
    color: "bg-blue-400/95 text-blue-100/70",
  },
  {
    Icon: SiBootstrap,
    name: "Bootstrap",
    color: "bg-purple-400/95 text-purple-100/70",
  },
];
