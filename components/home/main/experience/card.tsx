import { ExternalLink } from "lucide-react";
import type { Experience } from "../../type";
import Link from "next/link";
import { motion } from "framer-motion";
import { item } from "./animation";

type Props = { experience: Experience };

function ExperienceCard({ experience }: Props) {
  return (
    <motion.li className="mb-12 snap-center" variants={item}>
      <div className="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
        <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-slate-800/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg"></div>
        <header
          className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-slate-500 sm:col-span-2"
          aria-label="2018 to Present"
        >
          {experience.duration}
        </header>
        <div className="z-10 sm:col-span-6">
          <h3 className="font-medium leading-snug text-slate-200">
            <div>
              <Link
                className="group/link inline-flex items-baseline text-base font-medium leading-tight text-slate-200  hover:text-teal-300 focus-visible:text-teal-300"
                href={experience.website}
                target="_blank"
                rel="noreferrer"
                aria-label={`${experience.position} at ${experience.company}}`}
              >
                <span className="absolute -inset-x-4 -inset-y-2.5 hidden rounded md:-inset-x-6 md:-inset-y-4 lg:block"></span>
                <span>
                  {experience.position} &#x2022;{" "}
                  <span className="inline-block">
                    {experience.company}
                    <ExternalLink className="ml-1 inline-block h-4 w-4 shrink-0 translate-y-px transition-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1 group-focus-visible/link:-translate-y-1 group-focus-visible/link:translate-x-1 motion-reduce:transition-none" />
                  </span>
                </span>
              </Link>
            </div>
            {experience.previousPosition &&
              experience.previousPosition.map((position, index) => {
                return (
                  <div key={index}>
                    <div className="text-slate-500" aria-hidden="true">
                      {position}
                    </div>
                  </div>
                );
              })}
          </h3>
          <p className="mt-2 text-sm leading-normal">
            {experience.description}
          </p>
          <ul className="mt-2 flex flex-wrap" aria-label="Technologies used">
            {experience.techStack.map((tech, index) => {
              return (
                <li className="mr-1.5 mt-2" key={index}>
                  <div className="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium capitalize leading-5 text-teal-300">
                    {tech}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </motion.li>
  );
}

export default ExperienceCard;
