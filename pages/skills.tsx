import Card from "~/components/skills/card";
import { skills } from "~/components/skills/constant";
import { Button } from "~/components/ui/button";
import { IoArrowBackOutline } from "react-icons/io5";
import { useRouter } from "next/router";
import { motion } from "framer-motion";

type Props = {};

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      type: "tween",
    },
  },
};

function Skills({}: Props) {
  const router = useRouter();
  return (
    <motion.main
      className="relative p-5"
      initial={{ scale: 0.6, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.6, opacity: 0 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
      }}
    >
      <Button
        variant={"ghost"}
        size={"icon"}
        onClick={() => {
          router.back();
        }}
        className="fixed left-5 top-5"
      >
        <IoArrowBackOutline className="h-5 w-5" />
      </Button>
      <h1 className="text-center text-3xl font-bold uppercase">Skills</h1>
      <motion.ul
        className="mx-auto mt-10 grid max-w-2xl grid-cols-3 gap-x-5 gap-y-10 p-5 md:grid-cols-4 md:gap-7 lg:grid-cols-5 lg:gap-8"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {skills.map((skill) => {
          return <Card key={skill.id} skill={skill} />;
        })}
      </motion.ul>
    </motion.main>
  );
}

export default Skills;
