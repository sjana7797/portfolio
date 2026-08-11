import { SITE_URL, site } from "@/lib/site"
import { experiences } from "@/features/experience/data"
import { projects } from "@/features/projects/data"

const PERSON_ID = `${SITE_URL}/#person`
const SITE_ID = `${SITE_URL}/#website`

/** Turn "Sep 2025 – Present" into ISO-ish dates schema.org accepts. */
function parsePeriod(period: string) {
  const months: Record<string, string> = {
    jan: "01", feb: "02", mar: "03", apr: "04", may: "05", jun: "06",
    jul: "07", aug: "08", sep: "09", oct: "10", nov: "11", dec: "12",
  }
  const toIso = (part: string) => {
    const m = part.trim().match(/^([A-Za-z]{3})[a-z]*\s+(\d{4})$/)
    if (!m) return undefined
    return `${m[2]}-${months[m[1].toLowerCase()] ?? "01"}`
  }
  const [rawStart, rawEnd] = period.split(/[–-]/)
  return {
    startDate: toIso(rawStart ?? ""),
    endDate: /present/i.test(rawEnd ?? "") ? undefined : toIso(rawEnd ?? ""),
  }
}

const person = {
  "@type": "Person",
  "@id": PERSON_ID,
  name: site.name,
  url: SITE_URL,
  email: `mailto:${site.email}`,
  jobTitle: site.jobTitle,
  description: site.summary,
  image: `${SITE_URL}/avatar.png`,
  sameAs: [...site.sameAs],
  knowsAbout: [...site.skills],
  address: {
    "@type": "PostalAddress",
    addressLocality: site.locality,
    addressRegion: site.region,
    addressCountry: site.country,
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: site.alumniOf,
  },
  worksFor: {
    "@type": "Organization",
    name: site.employer,
  },
  hasOccupation: experiences.map((job) => {
    const { startDate, endDate } = parsePeriod(job.period)
    return {
      "@type": "EmployeeRole",
      roleName: job.role,
      ...(startDate ? { startDate } : {}),
      ...(endDate ? { endDate } : {}),
      worksFor: { "@type": "Organization", name: job.company },
      description: job.highlights.join(" "),
      skills: job.tech.join(", "),
    }
  }),
  // Credential is what actually surfaces the degree in knowledge panels.
  hasCredential: {
    "@type": "EducationalOccupationalCredential",
    credentialCategory: "Postgraduate Degree",
    name: "PG in Software Development",
    recognizedBy: { "@type": "CollegeOrUniversity", name: site.alumniOf },
  },
}

const website = {
  "@type": "WebSite",
  "@id": SITE_ID,
  url: SITE_URL,
  name: `${site.name} — ${site.jobTitle}`,
  description: site.description,
  inLanguage: "en",
  publisher: { "@id": PERSON_ID },
}

const projectList = {
  "@type": "ItemList",
  "@id": `${SITE_URL}/#projects`,
  name: "Projects by Sanjay Jana",
  numberOfItems: projects.length,
  itemListElement: projects.map((project, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "SoftwareApplication",
      name: project.title,
      description: project.description,
      applicationCategory: project.category,
      ...(project.href ? { url: project.href } : {}),
      author: { "@id": PERSON_ID },
      keywords: project.tech.join(", "),
    },
  })),
}

/**
 * One consolidated JSON-LD graph. A single @graph with cross-referenced
 * @ids beats several loose blocks — crawlers resolve the relationships
 * (this person authored these projects, on this site) instead of
 * treating each block as an unrelated island.
 */
export function StructuredData({
  page,
}: {
  /** Which route this is, so the right page node and breadcrumbs emit. */
  page: { path: string; name: string; description: string }
}) {
  const isHome = page.path === "/"
  const pageUrl = `${SITE_URL}${page.path === "/" ? "" : page.path}`

  const pageNode = {
    "@type": isHome ? "ProfilePage" : "WebPage",
    "@id": `${pageUrl}#page`,
    url: pageUrl,
    name: page.name,
    description: page.description,
    isPartOf: { "@id": SITE_ID },
    about: { "@id": PERSON_ID },
    inLanguage: "en",
    ...(isHome ? { mainEntity: { "@id": PERSON_ID } } : {}),
  }

  const breadcrumbs = isHome
    ? []
    : [
        {
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
            { "@type": "ListItem", position: 2, name: page.name, item: pageUrl },
          ],
        },
      ]

  const graph = {
    "@context": "https://schema.org",
    "@graph": [person, website, pageNode, projectList, ...breadcrumbs],
  }

  // Built from local data, never user input — but a stray "</script>"
  // in any description would still terminate the tag early, so escape
  // the characters that can break out of a script element.
  const json = JSON.stringify(graph)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026")

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />
}
