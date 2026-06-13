"use client"

import { motion } from "framer-motion"
import { fadeUp, stagger, viewportOnce } from "@/lib/motion"
import { projects } from "./data"
import { ProjectCard } from "./components/project-card"

export function ProjectsSection() {
  return (
    <section className="space-y-12">
      <motion.div
        variants={stagger(0.08)}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={fadeUp}>
          <p className="section-heading">Work</p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Notable Projects
          </h2>
          <p className="mt-3 text-muted-foreground max-w-lg text-[15px] leading-relaxed">
            A selection of production and personal projects spanning AI,
            fintech, healthcare, and e-commerce.
          </p>
        </motion.div>
      </motion.div>

      <motion.div
        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3"
        variants={stagger(0.06)}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
      >
        {projects.map((project, i) => (
          <ProjectCard key={project.title} project={project} index={i} />
        ))}
      </motion.div>
    </section>
  )
}
