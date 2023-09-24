import { useEffect, useState } from "react";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Card, CardContent } from "../ui/card";
import { Progress } from "../ui/progress";
import { Skill, SkillType } from "./type";

export function renderSkills(skillsMap: Map<SkillType, Skill[]>) {
  const skillsComponents: JSX.Element[] = [];
  skillsMap.forEach((skills, type) => {
    const skillComponent = (
      <AccordionItem value={type}>
        <AccordionTrigger className="capitalize hover:no-underline">
          {type}
        </AccordionTrigger>
        <AccordionContent>
          <Card>
            <CardContent className="space-y-4 py-4">
              {skills.map((skill) => (
                <SkillCardContent key={skill.id} skill={skill} />
              ))}
            </CardContent>
          </Card>
        </AccordionContent>
      </AccordionItem>
    );

    skillsComponents.push(skillComponent);
  });

  return skillsComponents;
}

function SkillCardContent({ skill }: { skill: Skill }) {
  const [progress, setProgress] = useState(10);
  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(skill.level);
    }, 500);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="space-y-2" key={skill.id}>
      <h3>{skill.name}</h3>
      <div className="flex items-center gap-2">
        <Progress value={progress} />
        <span>{skill.level}%</span>
      </div>
    </div>
  );
}
