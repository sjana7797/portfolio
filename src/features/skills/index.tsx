import { Reveal } from "@/components/voyage/reveal"
import { Section, SectionHeading } from "@/components/voyage/section-heading"
import { GitHubStats } from "@/features/skills/components/github-stats"
import { skillGroups } from "@/features/skills/data"

/** Rotating accent so the eight kit columns don't read as one flat block. */
const tones = ["text-amber", "text-sea", "text-crimson"]

export function SkillsSection() {
  return (
    <Section id="stack">
      <SectionHeading index="04" label="THE KIT I CARRY" />

      <Reveal className="v-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {skillGroups.map((group, i) => (
          <div key={group.category} className="px-7 py-7">
            <div
              className={`v-mono mb-4 text-[10px] uppercase tracking-[0.2em] ${tones[i % tones.length]}`}
            >
              {group.category}
            </div>
            <div className="grid gap-2.5 text-[15.5px] text-body">
              {group.skills.map((s) => (
                <span key={s}>{s}</span>
              ))}
            </div>
          </div>
        ))}
      </Reveal>

      <Reveal className="mt-4.5 grid gap-4.5 lg:grid-cols-2">
        <GitHubStats />

        <div className="v-card flex flex-col justify-between gap-6 px-7 py-7">
          <div>
            <div className="v-label">Education</div>
            <div className="mt-3 text-[19px] font-bold text-ink">
              PG in Software Development
            </div>
            <div className="mt-1.5 text-[15px] text-body">
              IIIT Bangalore · GPA 3.8 / 4.0
            </div>
          </div>
          <a
            href="/resume.pdf"
            download="Sanjay-Jana-Resume.pdf"
            className="inline-flex items-center justify-between gap-3 bg-gold px-5 py-4 text-sm font-bold text-ink transition-colors hover:bg-crimson hover:text-parchment"
          >
            <span>Download the full resume</span>
            <span>↓</span>
          </a>
        </div>
      </Reveal>
    </Section>
  )
}
