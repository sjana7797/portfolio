import { aboutMe } from "../constants";
import { motion } from "framer-motion";

function About() {
  return (
    <section
      id="about"
      className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24"
      aria-label="About me"
    >
      <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-slate-900/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
        <h2 className="text-sm font-bold uppercase tracking-widest text-teal-400 lg:sr-only">
          About
        </h2>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{
          opacity: 1,
        }}
        transition={{
          duration: 0.5,
          type: "spring",
          stiffness: 260,
        }}
      >
        <p className="mb-4">{aboutMe}</p>
      </motion.div>
    </section>
  );
}

export default About;
