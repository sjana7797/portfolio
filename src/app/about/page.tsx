import Experience from "@/components/Home/Experience";
import Skills from "@/components/About/Skills";
import React from "react";

type Props = {};

function About({}: Props) {
  return (
    <main className="flex flex-col gap-5">
      <div className="p-5 bg-slate-800 w-fit m-10 rounded-lg">
        <Experience />
      </div>
      <Skills />
    </main>
  );
}

export default About;
