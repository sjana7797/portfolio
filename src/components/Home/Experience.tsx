"use client";
import { dummy } from "@/config/work";
import Details from "./Details";
import { useScroll, motion } from "framer-motion";
import { useRef } from "react";

type Props = {};

function Experience({}: Props) {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start end", "center start"],
  });

  return (
    <>
      <h2 className="font-bold text-4xl w-full text-center md:text-6xl xl:text-8xl text-slate-200 uppercase">
        Experience
      </h2>
      <div
        className="md:w-3/4 text-slate-300 w-4/5 mx-auto relative mt-20"
        ref={scrollRef}
      >
        <motion.div
          style={{
            scaleY: scrollYProgress,
          }}
          className="absolute md:left-9 left-1 top-0 w-1 origin-top bg-slate-100 h-full"
        />
        <ul className="flex flex-col gap-8 w-full justify-between items-center mt-4">
          {dummy.map((w, i) => {
            return <Details key={i} {...w} />;
          })}
        </ul>
      </div>
    </>
  );
}

export default Experience;
