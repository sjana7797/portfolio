import Link from "next/link";
import React from "react";
import Laptop from "~/components/common/mockup/laptop";
import Mobile from "~/components/common/mockup/mobile";
import { buttonVariants } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import { motion } from "framer-motion";

type Props = {};

function Projects({}: Props) {
  return (
    <section
      id="projects"
      className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24"
      aria-label="Projects"
    >
      <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-slate-900/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
        <h2 className="text-sm font-bold uppercase tracking-widest text-teal-400 lg:sr-only">
          Projects
        </h2>
      </div>

      <motion.div
        className="relative select-none"
        initial={{ x: 200, opacity: 0.7 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
          duration: 0.5,
          delay: 0.3,
        }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="absolute left-32 top-8 z-10 hidden lg:block">
          <Laptop img="/assets/cinematics/laptop.jpg" />
        </div>
        <div className="absolute -top-[100px] lg:-top-[160px]">
          <Mobile img="/assets/cinematics/mobile.jpg" />
        </div>
      </motion.div>
      <div className="mt-[380px] ">
        <h3 className="text-xl font-semibold tracking-wide text-cyan-500 lg:text-3xl">
          Cinematics
        </h3>
        <p className="mt-5">
          Cinematics is a user-friendly content details application designed to
          provide comprehensive information about movies and TV series. The app
          utilizes the TMDB API to gather data, ensuring accurate and up-to-date
          content. Developed with React JS, Cinematics offers seamless
          navigation and an intuitive user interface. React Router is employed
          for efficient routing, enabling smooth transitions between different
          sections of the app. The application&apos;s visual appeal is enhanced
          through the use of Tailwind CSS, while lazy sizes are utilized for
          image optimization, ensuring optimal performance and faster loading
          times.
        </p>
        <div className="mt-2 flex select-none flex-wrap gap-x-2 gap-y-3">
          {["react js", "tailwindCSS", "TMDB API"].map((tech, index) => {
            return (
              <div
                key={index}
                className="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium capitalize leading-5 text-teal-300"
              >
                {tech}
              </div>
            );
          })}
        </div>
      </div>
      <Link
        href={"/projects"}
        className={cn(
          buttonVariants({
            variant: "link",
          }),
          "mt-5 text-lg capitalize",
        )}
      >
        View All projects
      </Link>
    </section>
  );
}

export default Projects;
