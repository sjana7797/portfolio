import type { Metadata } from "next"
import { ExperienceSection } from "@/features/experience"
import { PageShell } from "@/components/voyage/page-shell"
import { StructuredData } from "@/components/seo/structured-data"
import { SITE_URL } from "@/lib/site"

const title = "Experience — Sanjay Jana"
const description =
  "Six years across five companies: Senior Software Engineer at Enso WebWorks and MintOak, full stack at SaaSMonk, React at ValarTech, and System Engineer at TCS — AI platforms, fintech and enterprise banking."

export const metadata: Metadata = {
  title: "Experience",
  description,
  alternates: { canonical: "/experience" },
  openGraph: {
    title,
    description,
    url: "/experience",
    images: [`${SITE_URL}/opengraph-image`],
  },
  twitter: { title, description },
}

export default function ExperiencePage() {
  return (
    <PageShell backTo="#voyage">
      <StructuredData
        page={{ path: "/experience", name: "Experience", description }}
      />
      <ExperienceSection />
    </PageShell>
  )
}
