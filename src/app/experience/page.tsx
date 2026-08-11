import type { Metadata } from "next"
import { ExperienceSection } from "@/features/experience"
import { PageShell } from "@/components/voyage/page-shell"
import { StructuredData } from "@/components/seo/structured-data"

const description =
  "Six years across five companies: Senior Software Engineer at Enso WebWorks and MintOak, full stack at SaaSMonk, React at ValarTech, and System Engineer at TCS — AI platforms, fintech and enterprise banking."

export const metadata: Metadata = {
  title: "Experience",
  description,
  alternates: { canonical: "/experience" },
  openGraph: { title: "Experience — Sanjay Jana", description, url: "/experience" },
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
