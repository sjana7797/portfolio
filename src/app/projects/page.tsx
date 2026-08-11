import type { Metadata } from "next"
import { ProjectsSection } from "@/features/projects"
import { PageShell } from "@/components/voyage/page-shell"
import { StructuredData } from "@/components/seo/structured-data"

const description =
  "Projects by Sanjay Jana: multi-model AI chat platforms on LangChain and RAG, AI chat with real-time web search, RBAC admin portals, the MintOak fintech platform, and GPhC-regulated online pharmacies."

export const metadata: Metadata = {
  title: "Projects",
  description,
  alternates: { canonical: "/projects" },
  openGraph: { title: "Projects — Sanjay Jana", description, url: "/projects" },
}

export default function ProjectsPage() {
  return (
    <PageShell backTo="#racks">
      <StructuredData page={{ path: "/projects", name: "Projects", description }} />
      <ProjectsSection />
    </PageShell>
  )
}
