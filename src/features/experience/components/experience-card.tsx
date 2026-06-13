"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { fadeUp, viewportOnce } from "@/lib/motion"
import { type Experience } from "../data"

interface ExperienceCardProps {
  experience: Experience
  index: number
}

export function ExperienceCard({ experience, index }: ExperienceCardProps) {
  const { company, role, period, location, current, highlights, tech } =
    experience

  return (
    <motion.div
      className="relative pl-9 pb-14 last:pb-0"
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      transition={{ delay: index * 0.05 }}
    >
      {/* Timeline line */}
      <div className="absolute left-[3px] top-3.5 bottom-0 w-px bg-border/60" />

      {/* Timeline dot */}
      <div
        className={`absolute left-0 top-1.5 h-[7px] w-[7px] rounded-full transition-colors ${
          current
            ? "bg-primary shadow-[0_0_10px_2px] shadow-primary/40"
            : "bg-muted-foreground/30 border border-border"
        }`}
      />

      <div className="space-y-3.5">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-semibold text-[15px] leading-tight">
                {role}
              </h3>
              {current && (
                <span className="inline-flex items-center px-1.5 py-0 rounded text-[9px] font-mono tracking-wider border border-primary/40 text-primary bg-primary/8 leading-4">
                  CURRENT
                </span>
              )}
            </div>
            <p className="text-sm text-muted-foreground mt-0.5">
              <span className="font-medium text-foreground/80">{company}</span>
              <span className="mx-1.5 text-border">·</span>
              {location}
            </p>
          </div>
          <span className="font-mono text-[11px] text-muted-foreground/70 shrink-0 sm:pt-0.5 tabular-nums">
            {period}
          </span>
        </div>

        {/* Highlights */}
        <ul className="space-y-2">
          {highlights.map((h, i) => (
            <li key={i} className="flex gap-3 text-[13.5px] text-muted-foreground">
              <span className="text-primary/60 shrink-0 mt-[3px] text-xs">▸</span>
              <span className="leading-[1.65]">{h}</span>
            </li>
          ))}
        </ul>

        {/* Tech */}
        {tech.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-0.5">
            {tech.map((t) => (
              <Badge
                key={t}
                variant="secondary"
                className="font-mono text-[10px] px-2 py-0.5 bg-secondary/60 border-transparent"
              >
                {t}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  )
}
