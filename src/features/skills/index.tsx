"use client"

import { motion } from "framer-motion"
import { fadeUp, stagger, viewportOnce } from "@/lib/motion"
import { skillGroups } from "./data"
import { SkillGroupCard } from "./components/skill-group"

export function SkillsSection() {
  return (
    <section className="space-y-12">
      <motion.div
        variants={stagger(0.08)}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={fadeUp}>
          <p className="section-heading">Expertise</p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Technical Skills
          </h2>
          <p className="mt-3 text-muted-foreground max-w-lg text-[15px] leading-relaxed">
            A broad, deep stack — AI/ML pipelines to fintech frontends, built
            across 6+ years of production engineering.
          </p>
        </motion.div>
      </motion.div>

      <motion.div
        className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3"
        variants={stagger(0.05)}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
      >
        {skillGroups.map((group, i) => (
          <SkillGroupCard key={group.category} group={group} index={i} />
        ))}
      </motion.div>
    </section>
  )
}
