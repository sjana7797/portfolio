import { profileSummary } from "../constants";

function Summary() {
  return (
    <section
      id="summary"
      className="mb-16 scroll-mt-16 text-teal-500 md:mb-24 lg:mb-36 lg:scroll-mt-24"
      aria-label="Profile Summary"
    >
      <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-slate-900/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
        <h2 className="text-sm font-bold uppercase tracking-widest text-slate-200 lg:sr-only">
          Profile Summary
        </h2>
      </div>
      <div className="lg:before:animate-rotate lg:relative lg:flex lg:items-center lg:justify-center lg:overflow-hidden lg:rounded-lg lg:p-1 lg:before:absolute lg:before:h-[50%] lg:before:w-[150%] lg:before:bg-gradient-to-tr lg:before:from-teal-500 lg:before:to-fuchsia-400 lg:before:content-['']">
        <div className="lg:relative lg:z-10 lg:rounded-lg lg:border-2 lg:border-transparent lg:bg-slate-800 lg:px-10 lg:py-5 lg:font-semibold lg:text-cyan-600 lg:shadow-lg lg:backdrop-blur-sm">
          <p className="mb-4">{profileSummary}</p>
        </div>
      </div>
    </section>
  );
}

export default Summary;
