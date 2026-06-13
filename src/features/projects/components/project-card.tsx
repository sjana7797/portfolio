"use client"

import { ArrowUpRight } from "lucide-react"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { scaleIn } from "@/lib/motion"
import { type Project } from "../data"

const categoryColors: Record<Project["category"], string> = {
  "AI / ML": "text-violet-400 border-violet-500/30 bg-violet-500/8",
  FinTech: "text-emerald-400 border-emerald-500/30 bg-emerald-500/8",
  SaaS: "text-blue-400 border-blue-500/30 bg-blue-500/8",
  "E-Commerce": "text-orange-400 border-orange-500/30 bg-orange-500/8",
  Healthcare: "text-rose-400 border-rose-500/30 bg-rose-500/8",
  Enterprise: "text-sky-400 border-sky-500/30 bg-sky-500/8",
}

interface ProjectCardProps {
  project: Project
  index: number
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const { title, description, tech, highlights, category, type, href } = project

  const Wrapper = href ? motion.a : motion.div

  return (
    <Wrapper
      {...(href
        ? { href, target: "_blank", rel: "noreferrer" }
        : {})}
      variants={scaleIn}
      transition={{ delay: index * 0.06 }}
      whileHover={{ y: -4, transition: { duration: 0.22 } }}
      className="h-full block"
    >
      <Card
        className={`border-border/40 bg-card/30 flex flex-col h-full group hover:border-primary/30 hover:bg-card/60 transition-all duration-300 ${href ? "cursor-pointer" : "cursor-default"}`}
      >
        <CardHeader className="pb-3 pt-5">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0 space-y-2">
              <div className="flex flex-wrap gap-1.5">
                <span
                  className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono border ${categoryColors[category]}`}
                >
                  {category}
                </span>
                <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono border border-border/60 text-muted-foreground capitalize">
                  {type}
                </span>
              </div>
              <h3 className="font-semibold text-[14px] leading-snug">{title}</h3>
            </div>
            <div
              className={`h-7 w-7 rounded-full border border-border/60 flex items-center justify-center transition-all duration-200 shrink-0 ${
                href
                  ? "text-muted-foreground/70 group-hover:text-foreground group-hover:border-primary/50 group-hover:bg-primary/5"
                  : "text-muted-foreground/30"
              }`}
            >
              <ArrowUpRight className="h-3.5 w-3.5" />
            </div>
          </div>
          <p className="text-[12.5px] text-muted-foreground leading-[1.65] mt-1">
            {description}
          </p>
        </CardHeader>

        <CardContent className="flex-1 space-y-4 pt-0">
          <ul className="space-y-1.5">
            {highlights.map((h, i) => (
              <li key={i} className="flex gap-2 text-[12px] text-muted-foreground">
                <span className="text-primary/50 shrink-0 mt-[3px] text-[10px]">▸</span>
                <span className="leading-[1.6]">{h}</span>
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-1 pt-1 border-t border-border/30">
            {tech.map((t) => (
              <Badge
                key={t}
                variant="secondary"
                className="font-mono text-[10px] px-1.5 py-0.5 bg-secondary/40 border-transparent"
              >
                {t}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </Wrapper>
  )
}
