import { ArrowUpRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { type Project } from "../data"

const categoryColors: Record<Project["category"], string> = {
  "AI / ML": "bg-violet-500/10 text-violet-500 border-violet-500/20",
  FinTech: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
  SaaS: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  "E-Commerce": "bg-orange-500/10 text-orange-500 border-orange-500/20",
  Healthcare: "bg-rose-500/10 text-rose-500 border-rose-500/20",
  Enterprise: "bg-sky-500/10 text-sky-500 border-sky-500/20",
}

interface ProjectCardProps {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  const { title, description, tech, highlights, category, type } = project

  return (
    <Card className="glow-border bg-card/50 flex flex-col h-full group">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="space-y-1.5 flex-1 min-w-0">
            <div className="flex flex-wrap gap-1.5">
              <span
                className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-mono border ${categoryColors[category]}`}
              >
                {category}
              </span>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-mono border border-border text-muted-foreground capitalize">
                {type}
              </span>
            </div>
            <h3 className="font-semibold text-sm leading-snug">{title}</h3>
          </div>
          <div className="h-7 w-7 rounded-full border border-border flex items-center justify-center text-muted-foreground group-hover:text-foreground group-hover:border-primary/50 transition-colors shrink-0">
            <ArrowUpRight className="h-3.5 w-3.5" />
          </div>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed">{description}</p>
      </CardHeader>

      <CardContent className="flex-1 space-y-4">
        {/* Highlights */}
        <ul className="space-y-1">
          {highlights.map((h, i) => (
            <li key={i} className="flex gap-2 text-xs text-muted-foreground">
              <span className="text-primary shrink-0 mt-0.5">•</span>
              <span>{h}</span>
            </li>
          ))}
        </ul>

        {/* Tech badges */}
        <div className="flex flex-wrap gap-1 pt-1">
          {tech.map((t) => (
            <Badge key={t} variant="secondary" className="font-mono text-[10px] px-1.5 py-0">
              {t}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
