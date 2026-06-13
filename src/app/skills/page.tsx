import type { Metadata } from "next"
import { SkillsSection } from "@/features/skills"

export const metadata: Metadata = {
  title: "Skills — Sanjay Jana",
  description: "Technical skills across frontend, backend, AI/ML, databases, and DevOps.",
}

export default function SkillsPage() {
  return (
    <div className="py-16">
      <SkillsSection />
    </div>
  )
}
