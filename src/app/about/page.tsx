import type { Metadata } from "next"
import { About } from "@/features/about"
import { PageShell } from "@/components/voyage/page-shell"
import { StructuredData } from "@/components/seo/structured-data"

const description =
  "Sanjay Jana is a Senior Full Stack Engineer in Mumbai working across B2B SaaS, fintech, AI-powered products and enterprise banking, with a postgraduate degree from IIIT Bangalore."

export const metadata: Metadata = {
  title: "About",
  description,
  alternates: { canonical: "/about" },
  openGraph: { title: "About Sanjay Jana", description, url: "/about" },
}

export default function AboutPage() {
  return (
    <PageShell backTo="#about">
      <StructuredData page={{ path: "/about", name: "About", description }} />
      <About />
    </PageShell>
  )
}
