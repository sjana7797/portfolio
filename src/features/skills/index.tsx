import { skillGroups } from "./data"
import { SkillGroupCard } from "./components/skill-group"

export function SkillsSection() {
  return (
    <section className="space-y-10">
      <div>
        <p className="section-heading">Expertise</p>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Technical Skills</h2>
        <p className="mt-3 text-muted-foreground max-w-xl">
          A broad and deep stack — from AI/ML pipelines to fintech frontends, built across 6+
          years of production engineering.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {skillGroups.map((group) => (
          <SkillGroupCard key={group.category} group={group} />
        ))}
      </div>
    </section>
  )
}
