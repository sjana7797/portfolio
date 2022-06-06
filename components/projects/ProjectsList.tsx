import { Website } from "../../typing";
import ProjectCard from "./ProjectCard";

type Props = { projects: Website[] };

function ProjectsList({ projects }: Props) {
  return (
    <section className="mt-16 md:mt-20">
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project._id} project={project} />
        ))}
      </div>
    </section>
  );
}

export default ProjectsList;
