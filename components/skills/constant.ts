import { FaReact, FaNodeJs, FaHtml5, FaCss3Alt, FaFigma } from "react-icons/fa";
import {
  SiTailwindcss,
  SiMongodb,
  SiSass,
  SiTypescript,
  SiRedux,
  SiExpress,
} from "react-icons/si";
import { DiJavascript1 } from "react-icons/di";
import { TbBrandNextjs, TbSql } from "react-icons/tb";
import { BiLogoPostgresql } from "react-icons/bi";
import { BsGit } from "react-icons/bs";
import type { Skill, SkillType } from "./type";

const react: Skill = {
  id: "d31b4420-26d6-4646-984d-9f778f952c8e",
  name: "React",
  Icon: FaReact,
  level: 80,
  description: "React is a JavaScript library for building user interfaces.",
  color: "bg-blue-400 text-blue-100",
  type: "frontend",
};
const node: Skill = {
  id: "b5156672-af90-4950-be6b-81c92a252f12",
  name: "Node",
  Icon: FaNodeJs,
  level: 70,
  description:
    "Node.js is an open-source, cross-platform, back-end JavaScript runtime environment that runs on the V8 engine and executes JavaScript code outside a web browser.",
  color: "bg-emerald-300 text-emerald-700",
  type: "backend",
};

const tailwindCss: Skill = {
  id: "31c84449-b565-4e26-9999-9d65a778970e",
  name: "Tailwind CSS",
  Icon: SiTailwindcss,
  level: 90,
  description:
    "Tailwind CSS is a utility-first CSS framework for rapidly building custom user interfaces.",
  color: "bg-cyan-300 text-cyan-700",
  type: "frontend",
};

const javascript: Skill = {
  id: "fb347b34-91fd-4a65-b034-4cabda315727",
  name: "Javascript",
  Icon: DiJavascript1,
  level: 80,
  description:
    "JavaScript, often abbreviated as JS, is a programming language that conforms to the ECMAScript specification.",
  color: "bg-yellow-300 text-yellow-600",
  type: "frontend",
};

const mongodb: Skill = {
  id: "cfdc9e9a-3e9e-4d7c-9f8a-679f761bd4ad",
  name: "MongoDB",
  Icon: SiMongodb,
  level: 70,
  description:
    "MongoDB is a source-available cross-platform document-oriented database program.",
  color: "bg-green-400 text-green-100",
  type: "database",
};

const next: Skill = {
  id: "f2dd1a30-d8cd-49cc-b0e0-5033a0175414",
  name: "Next Js",
  Icon: TbBrandNextjs,
  level: 80,
  description:
    "Next.js is an open-source React front-end development web framework created by Vercel that enables functionality such as server-side rendering and generating static websites for React based web applications.",
  color: "bg-black text-gray-100",
  type: "frontend",
};

const html: Skill = {
  id: "a6cf35b0-a19f-47e0-b53b-68e56ba4afa2",
  name: "HTML",
  Icon: FaHtml5,
  level: 90,
  description:
    "HTML is the standard markup language for documents designed to be displayed in a web browser.",
  color: "bg-red-400 text-red-100",
  type: "frontend",
};

const css: Skill = {
  id: "af83b9d2-e1a0-4864-aa19-213910d825ff",
  name: "CSS",
  Icon: FaCss3Alt,
  level: 80,
  description: "CSS is the language we use to style an HTML document.",
  color: "bg-blue-400 text-blue-100",
  type: "frontend",
};

const sass: Skill = {
  id: "c0c7f3a0-2f6b-4c7e-8e4b-9c2c6b3b4c6d",
  name: "Sass",
  Icon: SiSass,
  level: 70,
  description:
    "Sass is a preprocessor scripting language that is interpreted or compiled into Cascading Style Sheets.",
  color: "bg-pink-400 text-pink-100",
  type: "frontend",
};

const typescript: Skill = {
  id: "400c7a71-c6c9-4b9a-ad88-500fee46e602",
  name: "Typescript",
  Icon: SiTypescript,
  level: 70,
  description:
    "TypeScript is an open-source language which builds on JavaScript, one of the world's most used tools, by adding static type definitions.",
  color: "bg-blue-200 text-blue-600",
  type: "frontend",
};

const sql: Skill = {
  id: "6786b26b-8600-4e70-9523-5318508536e8",
  name: "SQL",
  Icon: TbSql,
  level: 70,
  description:
    "SQL is a standard language for storing, manipulating and retrieving data in databases.",
  color: "bg-green-400 text-green-100",
  type: "database",
};

const postgres: Skill = {
  id: "6786b26b-8600-4e70-9523-5318508536e7",
  name: "PostgreSQL",
  Icon: BiLogoPostgresql,
  level: 70,
  description:
    "PostgreSQL is a free and open-source relational database management system emphasizing extensibility and SQL compliance.",
  color: "bg-blue-400 text-blue-100",
  type: "database",
};

const figma: Skill = {
  id: "6786b26b-8600-4e70-9523-5318508536e6",
  name: "Figma",
  Icon: FaFigma,
  level: 80,
  description:
    "Figma is a vector graphics editor and prototyping tool which is primarily web-based, with additional offline features enabled by desktop applications for macOS and Windows.",
  color: "bg-pink-400 text-pink-100",
  type: "design",
};

const git: Skill = {
  id: "6786b26b-8600-4e70-9523-5318508536e5",
  name: "Git",
  Icon: BsGit,
  level: 80,
  description:
    "Git is software for tracking changes in any set of files, usually used for coordinating work among programmers collaboratively developing source code during software development.",
  color: "bg-red-400 text-red-100",
  type: "tools",
};

const redux: Skill = {
  id: "6786b26b-8600-4e70-9523-5318508536e4",
  name: "Redux",
  Icon: SiRedux,
  level: 80,
  description:
    "Redux is an open-source JavaScript library for managing application state.",
  color: "bg-purple-400 text-purple-100",
  type: "frontend",
};

const express: Skill = {
  id: "6786b26b-8600-4e70-9523-5318508536e3",
  name: "Express",
  Icon: SiExpress,
  level: 70,
  description:
    "Express.js, or simply Express, is a back end web application framework for Node.js.",
  color: "bg-black text-gray-100",
  type: "backend",
};

export const skills: Skill[] = [
  html,
  css,
  sass,
  javascript,
  typescript,
  react,
  redux,
  next,
  node,
  express,
  tailwindCss,
  mongodb,
  sql,
  postgres,
  figma,
  git,
];

export const segregatedSkills = new Map<SkillType, Skill[]>();

skills.forEach((skill) => {
  if (!segregatedSkills.get(skill.type)) {
    segregatedSkills.set(skill.type, []);
  }
  if (segregatedSkills.get(skill.type)) {
    segregatedSkills.get(skill.type)?.push(skill);
  }
});
