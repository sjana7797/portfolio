import Link from "next/link";
import { motion } from "framer-motion";
import Head from "next/head";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "~/components/ui/hover-card";
import { projects } from "~/components/projects/constants";

type Props = {};

function Projects({}: Props) {
  const MotionLink = motion(Link);
  return (
    <>
      <Head>
        <title>Projects | Sanjay Jana</title>
      </Head>
      <motion.main
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.6, opacity: 0 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
        }}
        className="relative flex h-screen flex-col gap-y-5 overflow-y-hidden p-5"
      >
        <div className="flex-grow"></div>
        <div className="flex h-[25%] flex-shrink-0 snap-x gap-x-3">
          {projects.map((project) => {
            return (
              <HoverCard key={project.id}>
                <HoverCardTrigger asChild>
                  <Card className="w-80 cursor-pointer transition-colors duration-200 ease-in hover:bg-cyan-950">
                    <CardHeader className="p-3">
                      <CardTitle className="truncate text-base font-medium">
                        {project.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-3 pt-0">
                      <p className="line-clamp-3 text-xs">
                        {project.description}
                      </p>
                    </CardContent>
                    <CardFooter></CardFooter>
                  </Card>
                </HoverCardTrigger>
                <HoverCardContent className="w-full max-w-md space-y-3">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="flex flex-wrap gap-x-3 gap-y-4">
                    {project.stack.map((tech, index) => {
                      return (
                        <div
                          key={index}
                          className="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium capitalize leading-5 text-teal-300"
                        >
                          {tech}
                        </div>
                      );
                    })}
                  </div>
                </HoverCardContent>
              </HoverCard>
            );
          })}
        </div>
      </motion.main>
    </>
  );
}

export default Projects;
