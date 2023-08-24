import { workExperiences } from "../constants";
import ExperienceCard from "./experience-card";
import { buttonVariants } from "~/components/ui/button";
import Link from "next/link";
import { cn } from "~/lib/utils";

function Experience() {
  return (
    <section
      id="experience"
      className="mb-16 scroll-mt-16 text-teal-500 md:mb-24 lg:mb-36 lg:scroll-mt-24"
      aria-label="Work experience"
    >
      <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-slate-900/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
        <h2 className="text-sm font-bold uppercase tracking-widest text-slate-200 lg:sr-only">
          Experience
        </h2>
      </div>
      <div>
        <ol className="group/list snap-y snap-center">
          {workExperiences.map((experience, index) => {
            return <ExperienceCard key={index} experience={experience} />;
          })}
        </ol>
        {/* <div className="mt-12">
          <a
            className="text-slate-20 group inline-flex items-center font-semibold leading-tight"
            aria-label="View Full Resume"
            href="/resume.pdf"
          >
            <span>
              <span className="border-b border-transparent pb-px transition group-hover:border-teal-300 motion-reduce:transition-none">
                View Full{" "}
              </span>
              <span className="whitespace-nowrap">
                <span className="border-b border-transparent pb-px transition group-hover:border-teal-300 motion-reduce:transition-none">
                  Resume
                </span>
                <ArrowRight className="ml-1 inline-block h-4 w-4 shrink-0 -translate-y-px transition-transform group-hover:translate-x-2 group-focus-visible:translate-x-2 motion-reduce:transition-none" />
              </span>
            </span>
          </a>
        </div> */}
        <div>
          <Link
            href="/projects"
            className={cn(buttonVariants({ variant: "default" }), "capitalize")}
          >
            projects
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Experience;
