import { site } from "@/lib/site"
import { experiences } from "@/features/experience/data"
import { skillGroups } from "@/features/skills/data"
import { education } from "@/features/resume/data"

export function TwoColumnResume() {
  return (
    <article className="mx-auto grid max-w-[1000px] grid-cols-1 bg-white text-neutral-900 lg:grid-cols-[300px_1fr]">
      <aside className="border-neutral-200 bg-neutral-50 px-8 py-12 lg:border-r">
        <h1 className="font-display text-[26px] leading-tight font-bold tracking-tight">
          {site.name}
        </h1>
        <p className="mt-1 text-[14px] text-neutral-600">{site.jobTitle}</p>

        <div className="mt-7 flex flex-col gap-1 text-[13px] text-neutral-600">
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
        </div>

        <h2 className="mt-9 text-[11px] font-bold tracking-[0.14em] text-neutral-400 uppercase">
          Skills
        </h2>
        <div className="mt-3 flex flex-col gap-3.5">
          {skillGroups.map((g) => (
            <div key={g.category}>
              <p className="text-[12.5px] font-semibold text-neutral-800">
                {g.category}
              </p>
              <div className="mt-1 flex flex-wrap gap-1">
                {g.skills.map((s) => (
                  <span
                    key={s}
                    className="rounded-full bg-neutral-200 px-2 py-0.5 text-[11px] text-neutral-700"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <h2 className="mt-9 text-[11px] font-bold tracking-[0.14em] text-neutral-400 uppercase">
          Education
        </h2>
        <div className="mt-3 flex flex-col gap-2 text-[12.5px] text-neutral-700">
          {education.map((e) => (
            <p key={e.degree}>
              <span className="font-semibold text-neutral-900">{e.degree}</span>
              <br />
              {e.school} · {e.meta}
            </p>
          ))}
        </div>
      </aside>

      <div className="px-8 py-12 sm:px-12">
        <p className="text-[15px] leading-[1.65] text-neutral-700">
          {site.summary}
        </p>

        <h2 className="mt-9 text-[12px] font-bold tracking-[0.14em] text-neutral-400 uppercase">
          Experience
        </h2>
        <div className="mt-4 flex flex-col gap-7">
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
              <div className="mt-2.5 flex flex-wrap gap-1.5">
                {job.tech.map((t) => (
                  <span
                    key={t}
                    className="rounded border border-neutral-200 px-1.5 py-0.5 text-[10.5px] text-neutral-500"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </article>
  )
}
