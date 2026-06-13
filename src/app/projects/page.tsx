import type { Metadata } from "next"
import { ProjectsSection } from "@/features/projects"

export const metadata: Metadata = {
  title: "Projects — Sanjay Jana",
  description: "Notable projects spanning AI platforms, fintech, healthcare, and e-commerce.",
}

export default function ProjectsPage() {
  return (
    <div className="py-16">
      <ProjectsSection />
    </div>
  )
}
