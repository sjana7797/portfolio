import { profileSummary } from "../constants";
import { motion } from "framer-motion";

function Summary() {
  return (
    <section
      id="summary"
      className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24"
      aria-label="Profile Summary"
    >
      <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-slate-900/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
        <h2 className="text-sm font-bold uppercase tracking-widest text-teal-400 lg:sr-only">
          Profile Summary
        </h2>
      </div>
      <motion.div
        className="lg:relative"
        animate={{ opacity: 1, scale: 1 }}
        initial={{ opacity: 0, scale: 0.1 }}
        transition={{
          duration: 0.5,
          type: "spring",
          stiffness: 260,
          damping: 20,
        }}
      >
        <div className="absolute inset-0 hidden bg-fuchsia-500 blur lg:block" />
        <div className="lg:relative lg:rounded-lg lg:border-2 lg:border-cyan-500 lg:bg-slate-800 lg:px-10 lg:py-5 lg:font-semibold lg:text-cyan-600 lg:shadow-lg lg:backdrop-blur-sm">
          <p className="mb-4">{profileSummary}</p>
        </div>
      </motion.div>
    </section>
  );
}

export default Summary;
