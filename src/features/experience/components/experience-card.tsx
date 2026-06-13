import { Badge } from "@/components/ui/badge"
import { type Experience } from "../data"

interface ExperienceCardProps {
  experience: Experience
  index: number
}

export function ExperienceCard({ experience, index }: ExperienceCardProps) {
  const { company, role, period, location, current, highlights, tech } = experience

  return (
    <div className="relative pl-8 pb-12 last:pb-0">
      {/* Timeline line */}
      <div className="absolute left-0 top-1.5 bottom-0 w-px bg-border last:hidden" />

      {/* Timeline dot */}
      <div
        className={`absolute left-[-4.5px] top-1.5 h-2.5 w-2.5 rounded-full border-2 ${
          current
            ? "bg-primary border-primary shadow-[0_0_8px] shadow-primary/50"
            : "bg-background border-border"
        }`}
      />

      <div className="space-y-3">
        {/* Header */}
        <div className="flex flex-wrap items-start gap-x-3 gap-y-1">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-semibold text-base leading-tight">{role}</h3>
              {current && (
                <Badge className="text-[10px] px-1.5 py-0 h-4 font-mono">Current</Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground mt-0.5">
              <span className="font-medium text-foreground">{company}</span>
              {" · "}
              {location}
            </p>
          </div>
          <span className="font-mono text-xs text-muted-foreground shrink-0 mt-0.5">{period}</span>
        </div>

        {/* Highlights */}
        <ul className="space-y-1.5">
          {highlights.map((h, i) => (
            <li key={i} className="flex gap-2 text-sm text-muted-foreground">
              <span className="text-primary mt-0.5 shrink-0">→</span>
              <span className="leading-snug">{h}</span>
            </li>
          ))}
        </ul>

        {/* Tech stack */}
        {tech.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {tech.map((t) => (
              <Badge key={t} variant="secondary" className="font-mono text-[11px] px-2 py-0.5">
                {t}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
