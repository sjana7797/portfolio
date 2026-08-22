import { site } from "@/lib/site"
import { experiences } from "@/features/experience/data"
import { skillGroups } from "@/features/skills/data"
import { education } from "@/features/resume/data"

/**
 * The default. Deliberately plain — a real, printable resume, not a
 * themed page — so it reads correctly no matter which site skin is
 * active underneath, and so it's the fastest, cleanest thing a
 * crawler or an AI answer engine sees on this route.
 */
export function SimpleResume() {
  return (
    <article className="mx-auto max-w-[820px] bg-white px-8 py-12 text-neutral-900 sm:px-14 sm:py-16">
      <header className="border-b border-neutral-300 pb-6">
        <h1 className="font-display text-[32px] font-bold tracking-tight sm:text-[38px]">
          {site.name}
        </h1>
        <p className="mt-1 text-[15px] text-neutral-600">{site.jobTitle}</p>
        <p className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[13px] text-neutral-500">
          <span>{site.email}</span>
          <span>
            {site.locality}, {site.region}
          </span>
          {site.sameAs.map((href) => (
            <a
              key={href}
              href={href}
              className="underline decoration-neutral-300 underline-offset-2 hover:text-neutral-900"
            >
              {href.replace(/^https?:\/\//, "")}
            </a>
          ))}
        </p>
      </header>

      <section className="mt-7">
        <p className="text-[15px] leading-[1.65] text-neutral-700">
          {site.summary}
        </p>
      </section>

      <section className="mt-9">
        <h2 className="text-[12px] font-bold tracking-[0.14em] text-neutral-400 uppercase">
          Experience
        </h2>
        <div className="mt-4 flex flex-col gap-6">
          {experiences.map((job) => (
            <div key={job.company}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-0.5">
                <h3 className="text-[16px] font-semibold text-neutral-900">
                  {job.role}{" "}
                  <span className="font-normal text-neutral-500">
                    · {job.company}
                  </span>
                </h3>
                <span className="text-[12.5px] text-neutral-500">
                  {job.period}
                </span>
              </div>
              <ul className="mt-2 flex list-disc flex-col gap-1 pl-5 text-[14px] leading-[1.55] text-neutral-700 marker:text-neutral-400">
                {job.highlights.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-9">
        <h2 className="text-[12px] font-bold tracking-[0.14em] text-neutral-400 uppercase">
          Skills
        </h2>
        <div className="mt-3 flex flex-col gap-1.5 text-[14px] text-neutral-700">
          {skillGroups.map((g) => (
            <p key={g.category}>
              <span className="font-semibold text-neutral-900">
                {g.category}:{" "}
              </span>
              {g.skills.join(", ")}
            </p>
          ))}
        </div>
      </section>

      <section className="mt-9">
        <h2 className="text-[12px] font-bold tracking-[0.14em] text-neutral-400 uppercase">
          Education
        </h2>
        <div className="mt-3 text-[14px] text-neutral-700">
          {education.map((e) => (
            <p key={e.degree}>
              <span className="font-semibold text-neutral-900">{e.degree}</span>{" "}
              — {e.school} <span className="text-neutral-500">({e.meta})</span>
            </p>
          ))}
        </div>
      </section>
    </article>
  )
}
