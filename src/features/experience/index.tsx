import { Briefcase } from "lucide-react"
import { experiences } from "./data"
import { ExperienceCard } from "./components/experience-card"

export function ExperienceSection() {
  return (
    <section className="space-y-10">
      <div>
        <p className="section-heading">Career</p>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
          Professional Experience
        </h2>
        <p className="mt-3 text-muted-foreground max-w-xl">
          6+ years across AI platforms, fintech, SaaS, and enterprise banking — from system
          engineer to senior full-stack architect.
        </p>
      </div>

      {/* Stats row */}
      <div className="flex flex-wrap gap-6 py-4 border-y border-border/50">
        <div>
          <p className="text-2xl font-bold">6+</p>
          <p className="text-xs text-muted-foreground">Years</p>
        </div>
        <div>
          <p className="text-2xl font-bold">5</p>
          <p className="text-xs text-muted-foreground">Companies</p>
        </div>
        <div>
          <p className="text-2xl font-bold flex items-center gap-1">
            <Briefcase className="h-5 w-5 text-primary" />
            Senior
          </p>
          <p className="text-xs text-muted-foreground">Current Level</p>
        </div>
      </div>

      {/* Timeline */}
      <div className="mt-2">
        {experiences.map((exp, i) => (
          <ExperienceCard key={exp.company} experience={exp} index={i} />
        ))}
      </div>
    </section>
  )
}
