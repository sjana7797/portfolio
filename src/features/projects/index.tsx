import { projects } from "./data"
import { ProjectCard } from "./components/project-card"

export function ProjectsSection() {
  return (
    <section className="space-y-10">
      <div>
        <p className="section-heading">Work</p>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Notable Projects</h2>
        <p className="mt-3 text-muted-foreground max-w-xl">
          A selection of production work and personal projects spanning AI platforms, fintech,
          healthcare, and e-commerce.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </section>
  )
}
