"use client"

import { motion } from "framer-motion"
import { site } from "@/lib/site"
import { experiences } from "@/features/experience/data"
import { skillGroups } from "@/features/skills/data"
import { education } from "@/features/resume/data"

function Card({
  tone,
  children,
}: {
  tone: "dark" | "crimson" | "sea"
  children: React.ReactNode
}) {
  const bg =
    tone === "dark"
      ? "bg-neutral-950 text-white"
      : tone === "crimson"
        ? "bg-rose-950 text-white"
        : "bg-sky-950 text-white"
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={`flex h-[calc(100vh-8rem)] min-h-[420px] w-full snap-start flex-col justify-center px-8 sm:px-16 ${bg}`}
    >
      {children}
    </motion.section>
  )
}

/**
 * Vertical snap-scroll — one idea per screen, like a story. This is
 * the one layout that isn't trying to be a document at all.
 */
export function ReelResume() {
  return (
    <div className="h-[calc(100vh-8rem)] snap-y snap-mandatory overflow-y-auto scroll-smooth">
      <Card tone="dark">
        <p className="text-[13px] font-semibold tracking-[0.2em] text-neutral-400 uppercase">
          {site.jobTitle}
        </p>
        <h1 className="mt-3 font-display text-[15vw] leading-[0.9] font-bold tracking-tight sm:text-[80px]">
          {site.name}
        </h1>
        <p className="mt-6 max-w-[52ch] text-[15px] leading-[1.6] text-neutral-300">
          {site.summary}
        </p>
        <p className="mt-6 text-[13px] text-neutral-500">Scroll ↓</p>
      </Card>

      {experiences.map((job, i) => (
        <Card key={job.company} tone={i % 2 === 0 ? "crimson" : "sea"}>
          <p className="text-[13px] font-semibold tracking-[0.2em] text-white/60 uppercase">
            {job.period}
          </p>
          <h2 className="mt-3 font-display text-[10vw] leading-[0.95] font-bold tracking-tight sm:text-[56px]">
            {job.role}
          </h2>
          <p className="mt-2 text-[16px] font-semibold text-white/80">
            {job.company}
          </p>
          <p className="mt-5 max-w-[54ch] text-[15px] leading-[1.6] text-white/85">
            {job.highlights[0]}
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {job.tech.map((t) => (
              <span
                key={t}
                className="rounded-full border border-white/25 px-3 py-1 text-[11px] text-white/80"
              >
                {t}
              </span>
            ))}
          </div>
        </Card>
      ))}

      <Card tone="dark">
        <p className="text-[13px] font-semibold tracking-[0.2em] text-neutral-400 uppercase">
          Skills
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          {skillGroups
            .flatMap((g) => g.skills)
            .map((s) => (
              <span
                key={s}
                className="rounded-full bg-white/10 px-3.5 py-1.5 text-[13px] text-white"
              >
                {s}
              </span>
            ))}
        </div>
      </Card>

      <Card tone="dark">
        <p className="text-[13px] font-semibold tracking-[0.2em] text-neutral-400 uppercase">
          Education & Contact
        </p>
        {education.map((e) => (
          <p key={e.degree} className="mt-4 text-[16px] text-white">
            {e.degree} — {e.school}{" "}
            <span className="text-neutral-500">({e.meta})</span>
          </p>
        ))}
        <div className="mt-6 flex flex-wrap gap-4 text-[15px] text-sky-300">
          <a href={`mailto:${site.email}`} className="hover:text-sky-200">
            {site.email}
          </a>
          {site.sameAs.map((href) => (
            <a key={href} href={href} className="hover:text-sky-200">
              {href.replace(/^https?:\/\//, "")}
            </a>
          ))}
        </div>
      </Card>
    </div>
  )
}
