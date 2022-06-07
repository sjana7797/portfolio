import React from "react";
import { Experience } from "../../typing";
import ExperienceCard from "./ExperienceCard";

type Props = { experiences: Experience[] };

function Experience({ experiences }: Props) {
  return (
    <section>
      <div>
        <h1 className="text-center text-3xl font-medium uppercase italic tracking-widest text-secondary underline decoration-wavy underline-offset-8 md:text-4xl lg:text-5xl xl:text-6xl">
          Experience
        </h1>
      </div>
      <div className="mx-auto mt-16 flex w-fit max-w-xl flex-col space-y-10 sm:w-full">
        {experiences.map((experience) => (
          <ExperienceCard key={experience._id} experience={experience} />
        ))}
      </div>
    </section>
  );
}

export default Experience;
