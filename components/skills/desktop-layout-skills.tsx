import { motion } from "framer-motion";
import { container } from "~/animations/card";
import { skills } from "./constant";
import Card from "./card";

type Props = {};

function DesktopLayoutSkills({}: Props) {
  return (
    <motion.ul
      className="mx-auto mt-10 hidden max-w-2xl grid-cols-3 gap-x-5 gap-y-10 p-5 md:grid md:grid-cols-4 md:gap-7 lg:grid-cols-5 lg:gap-8"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {skills.map((skill) => {
        return <Card key={skill.id} skill={skill} />;
      })}
    </motion.ul>
  );
}

export default DesktopLayoutSkills;
