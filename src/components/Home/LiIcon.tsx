import { motion, useScroll } from "framer-motion";
import { MutableRefObject } from "react";
type Props = { scrollRef: MutableRefObject<HTMLLIElement | null> };

function LiIcon({ scrollRef }: Props) {
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["center end", "center center"],
  });
  return (
    <figure className="absolute left-0 stroke-slate-100">
      <svg
        className="-rotate-90 -translate-x-5 md:translate-x-0 md:w-[75px] md:h-[75px] w-[50px] h-[50px]"
        viewBox="0 0 100 100"
      >
        <circle
          cx={"75"}
          cy={"50"}
          r={"20"}
          className="stroke-blue-500 stroke-[5px] fill-none"
        />
        <motion.circle
          style={{
            pathLength: scrollYProgress,
          }}
          cx={"75"}
          cy={"50"}
          r={"20"}
          className="stroke-[5px] fill-slate-800"
        />
        <circle
          cx={"75"}
          cy={"50"}
          r={"10"}
          className="stroke-1 fill-blue-500 animate-pulse"
        />
      </svg>
    </figure>
  );
}

export default LiIcon;
