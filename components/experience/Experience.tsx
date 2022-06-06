import React from "react";
import ExperienceCard from "./ExperienceCard";

type Props = {};

function Experience({}: Props) {
  return (
    <section>
      <div>
        <h1 className="text-center text-3xl font-medium uppercase italic tracking-widest text-secondary underline decoration-wavy underline-offset-8 md:text-4xl lg:text-5xl xl:text-6xl">
          Experience
        </h1>
      </div>
      <div className="mx-auto mt-16 flex w-fit max-w-xl flex-col space-y-10 sm:w-full">
        <ExperienceCard />
        <ExperienceCard />
        <ExperienceCard />
      </div>
    </section>
  );
}

export default Experience;
