import Link from "next/link";
import { skillsCube } from "./constants";
import { motion } from "framer-motion";
import { buttonVariants } from "~/components/ui/button";
import { cn } from "~/lib/utils";

type Props = {};

function Skills({}: Props) {
  return (
    <section
      id="about"
      className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24"
      aria-label="Skills"
    >
      <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-slate-900/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
        <h2 className="text-sm font-bold uppercase tracking-widest text-teal-400 lg:sr-only">
          Skills
        </h2>
      </div>
      <div className="mt-[100px] flex items-center justify-center">
        <motion.div
          className="animate-cubeRotation h-[150px] w-[150px]"
          style={{
            transformStyle: "preserve-3d",
          }}
          initial={{ scale: 0.5, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.6 }}
        >
          {skillsCube.map((skill, index) => (
            <div
              key={index}
              className="absolute flex h-[inherit] w-[inherit] items-center justify-center overflow-hidden rounded-lg shadow-[0_0_10px_#000] shadow-slate-700"
              style={{
                transform: `${skill.rotation} translate3d(0,0,100px)`,
              }}
              title={skill.name}
            >
              <skill.Icon
                className={`h-[inherit] w-[inherit] ${skill.color} backdrop-blur`}
              />
            </div>
          ))}
        </motion.div>
        {/* <div className="animate-cubeShadow h-10 w-[150px] rounded-[50%] bg-white/[0.171] blur-[3px]" /> */}
      </div>
      <div className="flex justify-center">
        <Link
          href={"/skills"}
          className={cn(
            buttonVariants({
              variant: "link",
            }),
            "mt-20 text-lg capitalize",
          )}
        >
          Check Skills
        </Link>
      </div>
    </section>
  );
}

export default Skills;
