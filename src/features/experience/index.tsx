"use client"

import { motion } from "framer-motion"
import { fadeUp, stagger, viewportOnce } from "@/lib/motion"
import { experiences } from "./data"
import { ExperienceCard } from "./components/experience-card"

export function ExperienceSection() {
  return (
    <section className="space-y-12">
      <motion.div
        variants={stagger(0.08)}
        initial="hidden"
        animate="show"
      >
        {/* Header */}
        <motion.div variants={fadeUp} className="mb-10">
          <p className="section-heading">Career</p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Professional Experience
          </h2>
          <p className="mt-3 text-muted-foreground max-w-lg text-[15px] leading-relaxed">
            6+ years across AI platforms, fintech, SaaS, and enterprise banking.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={fadeUp}
          className="flex flex-wrap gap-8 py-5 border-y border-border/40 mb-12"
        >
          {[
            { v: "6+", l: "Years" },
            { v: "5", l: "Companies" },
            { v: "Senior", l: "Current Level" },
            { v: "Mumbai", l: "Location" },
          ].map(({ v, l }) => (
            <div key={l}>
              <p className="text-xl font-bold">{v}</p>
              <p className="text-[11px] text-muted-foreground mt-0.5 tracking-wide">{l}</p>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Timeline */}
      <div>
        {experiences.map((exp, i) => (
          <ExperienceCard key={exp.company} experience={exp} index={i} />
        ))}
      </div>
    </section>
  )
}
