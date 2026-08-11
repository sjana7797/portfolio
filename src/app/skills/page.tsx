import type { Metadata } from "next"
import { SkillsSection } from "@/features/skills"
import { Marquee } from "@/components/voyage/marquee"
import { PageShell } from "@/components/voyage/page-shell"
import { StructuredData } from "@/components/seo/structured-data"

const description =
  "Technical skills: TypeScript, React and Next.js, Node.js, Nest.js, LangChain and RAG pipelines, Ollama, Hugging Face, MongoDB, PostgreSQL, Redis, Docker and design systems."

export const metadata: Metadata = {
  title: "Skills",
  description,
  alternates: { canonical: "/skills" },
  openGraph: { title: "Skills — Sanjay Jana", description, url: "/skills" },
}

export default function SkillsPage() {
  return (
    <PageShell backTo="#stack">
      <StructuredData page={{ path: "/skills", name: "Skills", description }} />
      <Marquee />
      <SkillsSection />
    </PageShell>
  )
}
