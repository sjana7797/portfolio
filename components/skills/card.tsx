import React from "react";
import type { Skill } from "./constant";
import { cn } from "~/lib/utils";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "~/components/ui/hover-card";
import { motion } from "framer-motion";

type Props = {
  skill: Skill;
};

const item = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
};

function Card({ skill }: Props) {
  return (
    <motion.li
      className={cn(
        "relative aspect-square w-full cursor-pointer rounded-full p-1.5",
        skill.color,
      )}
      variants={item}
    >
      <div
        className="absolute bottom-0 left-0 right-0 top-0 h-full w-full rounded-[50%]"
        style={{
          background: `conic-gradient(currentColor ${skill.level}%, transparent 0)`,
        }}
      ></div>
      <HoverCard>
        <HoverCardTrigger>
          <skill.Icon
            className={cn(
              "relative z-20 h-full w-full rounded-[50%] p-2",
              skill.color,
            )}
          />
        </HoverCardTrigger>
        <HoverCardContent>
          <h3 className="text-sm font-medium">{skill.name}</h3>
          <p className="text-xs">{skill.description}</p>
        </HoverCardContent>
      </HoverCard>
    </motion.li>
  );
}

export default Card;
