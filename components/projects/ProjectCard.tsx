/* eslint-disable @next/next/no-img-element */
import { FiLink } from "react-icons/fi";
import { Website } from "../../typing";
import { urlFor } from "../../utils/sanityClient";

type Props = { project: Website };

function ProjectCard({ project }: Props) {
  return (
    <a
      className="group flex cursor-pointer select-none snap-start flex-col items-center space-y-2 rounded-lg border border-base-content/40 bg-base-200 p-2 shadow-md"
      href={project.link}
      target="_blank"
      rel="noreferrer"
    >
      <div className="overflow-hidden rounded-2xl">
        <img
          data-src={`${urlFor(project.web_image.asset._ref)}`}
          className="lazyload transform object-cover transition-transform duration-300 group-hover:scale-105"
          alt={project.name}
        />
      </div>
      <h3 className="text-xl text-secondary">{project.name}</h3>
      <div className="mt-5 flex items-center space-x-1 self-end">
        <span>
          <FiLink className="text-secondary/50" />
        </span>
        <button className="btn btn-primary btn-sm">go to website</button>
      </div>
    </a>
  );
}

export default ProjectCard;
