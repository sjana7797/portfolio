import { Reveal } from "@/components/voyage/reveal"
import { Section, SectionHeading } from "@/components/voyage/section-heading"
import { experiences } from "@/features/experience/data"

export function ExperienceSection() {
  return (
    <Section id="voyage">
      <SectionHeading index="02" label="THE ROUTE SO FAR" />

      <Reveal
        as="h2"
        className="v-display m-0 mb-14 text-[clamp(40px,7vw,118px)] leading-[0.88] tracking-[-0.05em]"
      >
        FIVE PORTS,
        <br />
        ONE <span className="text-sea">HEADING</span>
      </Reveal>

      <div className="v-timeline v-grid grid border-x-0">
        {experiences.map((job, i) => (
          <Reveal
            as="article"
            key={job.company}
            className="v-tl-row grid gap-9 px-1 py-8 lg:grid-cols-[220px_1fr_300px]"
          >
            <div>
              {job.current && (
                <div className="v-mono inline-flex items-center bg-crimson px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-parchment">
                  Current port
                </div>
              )}
              <div
                className={`v-mono text-[13px] text-muted-ink ${job.current ? "mt-3" : ""}`}
              >
                {job.period}
              </div>
              {i === experiences.length - 1 && (
                <div className="v-mono mt-2.5 text-[10px] uppercase tracking-[0.18em] text-faint">
                  First port
                </div>
              )}
            </div>

            <div>
              <h3 className="v-display m-0 text-[clamp(24px,2.6vw,38px)] leading-[1.05] tracking-[-0.03em]">
                {job.role}
              </h3>
              <div className="v-mono mt-2 text-[12px] uppercase tracking-[0.12em] text-amber">
                {job.company} · {job.location}
              </div>
              <ul className="m-0 mt-4 grid list-disc gap-2.5 pl-5 text-[15px] leading-[1.5] text-body marker:text-sea">
                {job.highlights.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
            </div>

            <div className="flex flex-wrap content-start gap-1.5">
              {job.tech.map((t) => (
                <span key={t} className="v-tag">
                  {t}
                </span>
              ))}
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
