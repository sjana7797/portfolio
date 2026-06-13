import type { Metadata } from "next"
import { ExperienceSection } from "@/features/experience"

export const metadata: Metadata = {
  title: "Experience — Sanjay Jana",
  description: "6+ years of professional experience across AI, fintech, SaaS, and enterprise banking.",
}

export default function ExperiencePage() {
  return (
    <div className="py-16">
      <ExperienceSection />
    </div>
  )
}
