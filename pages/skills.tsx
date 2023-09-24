import { Button } from "~/components/ui/button";
import { IoArrowBackOutline } from "react-icons/io5";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import Head from "next/head";
import SkillsContainer from "~/components/skills/skills-container";

type Props = {};

function Skills({}: Props) {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Skills | Sanjay Jana</title>
      </Head>
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
          variant={"secondary"}
          size={"icon"}
          onClick={() => {
            router.back();
          }}
          className="fixed left-5 top-5 z-[100] rounded-full"
        >
          <IoArrowBackOutline className="h-5 w-5" />
        </Button>
        <h1 className="sticky top-0 z-50 bg-slate-900/70 text-center text-3xl font-bold uppercase backdrop-blur-sm">
          Skills
        </h1>
        <SkillsContainer />
      </motion.main>
    </>
  );
}

export default Skills;
