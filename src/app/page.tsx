import { Hero } from "@/features/hero"
import { About } from "@/features/about"
import { ExperienceSection } from "@/features/experience"
import { ProjectsSection } from "@/features/projects"
import { SkillsSection } from "@/features/skills"
import { ContactSection } from "@/features/contact"
import { Marquee } from "@/components/voyage/marquee"
import { StructuredData } from "@/components/seo/structured-data"
import { site } from "@/lib/site"

export default function HomePage() {
  return (
    <>
      <StructuredData
        page={{
          path: "/",
          name: "Sanjay Jana — Senior Full Stack Engineer",
          description: site.description,
        }}
      />
      <Hero />
      <About />
      <ExperienceSection />
      <ProjectsSection />
      <Marquee />
      <SkillsSection />
      <ContactSection />
    </>
  )
}
