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
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { type SkillGroup } from "../data"

const iconMap: Record<string, React.ElementType> = {
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
}

export function SkillGroupCard({ group }: SkillGroupCardProps) {
  const Icon = iconMap[group.icon] ?? Code2

  return (
    <Card className="glow-border bg-card/50 h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-md bg-primary/10 flex items-center justify-center shrink-0">
            <Icon className="h-4 w-4 text-primary" />
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
              className="font-mono text-[11px] px-2 py-0.5 cursor-default"
            >
              {skill}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
