"use client";
import { FaReact, FaNodeJs, FaJava } from "react-icons/fa";
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
} from "react-icons/si";
import { motion } from "framer-motion";

function Skills() {
  const skillsCube = [
    {
      Icon: FaReact,
      name: "React",
      level: "Beginner",
      rotation: "",
      color: "bg-blue-400/95 text-blue-100/70",
    },
    {
      Icon: FaNodeJs,
      name: "Node",
      level: "Beginner",
      rotation: "rotateY(180deg)",
      color: "bg-emerald-300/95 text-emerald-100/70",
    },
    {
      Icon: SiNextdotjs,
      name: "Next",
      level: "Beginner",
      rotation: "rotateY(-90deg)",
      color: "bg-black/95 text-gray-100/70",
    },
    {
      Icon: SiTailwindcss,
      name: "Tailwind CSS",
      level: "Beginner",
      rotation: "rotateY(90deg)",
      color: "bg-cyan-300/95 text-cyan-100/70",
    },
    {
      Icon: SiJavascript,
      name: "Javascript",
      level: "Beginner",
      rotation: "rotateX(90deg)",
      color: "bg-yellow-300/95 text-yellow-100/70",
    },
    {
      Icon: SiMongodb,
      name: "MongoDB",
      level: "Beginner",
      rotation: "rotateX(-90deg)",
      color: "bg-green-400/95 text-green-100/70",
    },
  ];

  const skillSets = [
    SiNextdotjs,
    SiTailwindcss,
    SiJavascript,
    SiMongodb,
    SiReact,
    SiNodedotjs,
    SiCss3,
    SiHtml5,
    FaJava,
    SiC,
  ];
  return (
    <div
      className="flex flex-col justify-around items-center overflow-x-hidden box-border h-[1300px] relative bg-slate-900"
      style={{
        perspective: "450px",
      }}
    >
      <h3 className="uppercase text-center mb-[4vmax] text-[4vmax] text-slate-200">
        skills
      </h3>
      <div
        className="w-[200px] h-[200px] animate-cubeRotation"
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        {skillsCube.map((skill, index) => (
          <div
            key={index}
            className="flex items-center justify-center shadow-[0_0_10px_#000] absolute shadow-slate-700 w-[inherit] h-[inherit] rounded-lg overflow-hidden"
            style={{
              transform: `${skill.rotation} translate3d(0,0,150px)`,
            }}
            title={skill.name}
          >
            <skill.Icon
              className={`w-[inherit] h-[inherit] ${skill.color} backdrop-blur`}
            />
          </div>
        ))}
      </div>
      <div className="w-[300px] h-10 bg-white/[0.171] rounded-[50%] animate-cubeShadow blur-[3px]" />
      <motion.div
        initial={{ opacity: 0, x: 10 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 2, type: "spring" }}
        className="flex px-[2vmax] flex-col right-[40px] absolute bg-blue-600 py-5 duration-1000 ease-linear rounded-lg border border-blue-800 shadow"
        style={{
          animationFillMode: "forwards",
        }}
      >
        {skillSets.map((Skill, index) => {
          return (
            <Skill
              className="text-[5vmax] cursor-pointer text-white m-[10px] transition-transform hover:scale-150"
              key={index}
            />
          );
        })}
      </motion.div>
    </div>
  );
}

export default Skills;
