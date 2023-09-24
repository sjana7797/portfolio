import { useState, useEffect } from "react";
import type { Skill } from "./type";
import { cn } from "~/lib/utils";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "~/components/ui/hover-card";
import { motion } from "framer-motion";
import { Progress } from "~/components/ui/progress";

type Props = {
  skill: Skill;
};

const item = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
};

function Card({ skill }: Props) {
  const [progress, setProgress] = useState(10);
  const [showCard, setShowCard] = useState(false);

  useEffect(() => {
    if (!showCard) {
      return;
    }
    const timer = setTimeout(() => setProgress(skill.level), 500);
    return () => clearTimeout(timer);
  }, [showCard, skill.level]);

  return (
    <HoverCard open={showCard} onOpenChange={setShowCard}>
      <HoverCardTrigger>
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
          <skill.Icon
            className={cn(
              "relative z-20 h-full w-full rounded-[50%] p-2",
              skill.color,
            )}
          />
        </motion.li>
      </HoverCardTrigger>
      <HoverCardContent className="space-y-2">
        <h3 className="text-sm font-medium">{skill.name}</h3>
        <p className="text-xs">{skill.description}</p>
        <div className="flex items-center gap-2">
          <Progress value={progress} className="w-[80%]" />
          <span>{skill.level}%</span>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}

export default Card;
