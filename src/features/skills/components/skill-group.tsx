"use client"

import {
  Brain,
  Code2,
  Database,
  FlaskConical,
  Layout,
  Server,
  Settings2,
  Zap,
} from "lucide-react"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { scaleIn } from "@/lib/motion"
import { type SkillGroup } from "../data"

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Code2,
  Layout,
  Server,
  Brain,
  Database,
  Zap,
  FlaskConical,
  Settings2,
}

interface SkillGroupCardProps {
  group: SkillGroup
  index: number
}

export function SkillGroupCard({ group, index }: SkillGroupCardProps) {
  const Icon = iconMap[group.icon] ?? Code2

  return (
    <motion.div
      variants={scaleIn}
      transition={{ delay: index * 0.04 }}
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
    >
      <Card className="border-border/40 bg-card/30 h-full hover:border-primary/30 hover:bg-card/60 transition-colors duration-300 group">
        <CardHeader className="pb-3 pt-5">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-md bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
              <Icon className="h-3.5 w-3.5 text-primary" />
            </div>
            <CardTitle className="text-sm font-semibold">{group.category}</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-1.5">
            {group.skills.map((skill) => (
              <Badge
                key={skill}
                variant="secondary"
                className="font-mono text-[10.5px] px-2 py-0.5 bg-secondary/50 border-transparent cursor-default"
              >
                {skill}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
