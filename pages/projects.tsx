import Link from "next/link";
import { motion } from "framer-motion";

type Props = {};

function Projects({}: Props) {
  const MotionLink = motion(Link);
  return (
    <MotionLink
      initial={{ x: 300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 300, opacity: 0 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
      }}
      href={"/"}
    >
      Projects
    </MotionLink>
  );
}

export default Projects;
