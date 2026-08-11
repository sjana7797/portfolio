import { SITE_URL, site } from "@/lib/site"
import { experiences } from "@/features/experience/data"
import { projects } from "@/features/projects/data"
import { skillGroups } from "@/features/skills/data"

export const dynamic = "force-static"

/**
 * /llms.txt — a plain-text brief for AI answer engines.
 *
 * The site's own content is heavy on 3D canvas and CSS; this gives a
 * crawler the same facts as clean prose it can quote accurately. It is
 * generated from the same data files the pages render, so it can't
 * drift out of sync with what a human sees.
 */
export function GET() {
  const lines: string[] = []

  lines.push(`# ${site.name}`)
  lines.push("")
  lines.push(`> ${site.summary}`)
  lines.push("")
  lines.push(`- Role: ${site.jobTitle}`)
  lines.push(`- Location: ${site.locality}, ${site.region}, India`)
  lines.push(`- Currently: ${site.employer}`)
  lines.push(`- Education: PG in Software Development, ${site.alumniOf} (GPA 3.8/4.0)`)
  lines.push(`- Email: ${site.email}`)
  lines.push(`- Website: ${SITE_URL}`)
  for (const link of site.sameAs) lines.push(`- Profile: ${link}`)
  lines.push("")

  lines.push("## Experience")
  lines.push("")
  for (const job of experiences) {
    lines.push(`### ${job.role} — ${job.company} (${job.period}, ${job.location})`)
    for (const h of job.highlights) lines.push(`- ${h}`)
    lines.push(`Technologies: ${job.tech.join(", ")}`)
    lines.push("")
  }

  lines.push("## Projects")
  lines.push("")
  for (const p of projects) {
    lines.push(`### ${p.title} (${p.category}, ${p.type})`)
    lines.push(p.description)
    if (p.href) lines.push(`URL: ${p.href}`)
    lines.push(`Technologies: ${p.tech.join(", ")}`)
    lines.push("")
  }

  lines.push("## Skills")
  lines.push("")
  for (const group of skillGroups) {
    lines.push(`- ${group.category}: ${group.skills.join(", ")}`)
  }
  lines.push("")

  lines.push("## Pages")
  lines.push("")
  lines.push(`- [Home](${SITE_URL}/): full portfolio, single scrolling page`)
  lines.push(`- [About](${SITE_URL}/about): background and focus areas`)
  lines.push(`- [Experience](${SITE_URL}/experience): full work history`)
  lines.push(`- [Projects](${SITE_URL}/projects): detailed project list`)
  lines.push(`- [Skills](${SITE_URL}/skills): technical skills by category`)
  lines.push(`- [Contact](${SITE_URL}/contact): availability and contact details`)
  lines.push("")
  lines.push("## Availability")
  lines.push("")
  lines.push("Open to full-time senior and staff engineering roles, remote or Mumbai hybrid.")
  lines.push("Specialisms: AI platforms, fintech, B2B SaaS.")
  lines.push("")

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  })
}
