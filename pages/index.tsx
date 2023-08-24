import { MouseEventHandler } from "react";
import Header from "~/components/home/header";
import Main from "~/components/home/main";
import Spotlight from "~/components/home/spotlight";
import { useSpotlightStore } from "~/store";
import { motion } from "framer-motion";

type Props = {};

function Home({}: Props) {
  const { setPosition } = useSpotlightStore();

  const handleSpotlightMouse: MouseEventHandler<HTMLElement> = (event) => {
    setPosition({ x: event.clientX, y: event.clientY });
  };
  return (
    <motion.main
      initial={{ x: 300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 300, opacity: 0 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
      }}
      className="relative h-screen w-screen overflow-y-scroll scroll-smooth scrollbar-hide"
      onMouseMove={handleSpotlightMouse}
    >
      <Spotlight />
      <div className="z-10 mx-auto min-h-screen max-w-screen-xl px-6 py-12 md:px-12 md:py-20 lg:px-24 lg:py-0">
        <div className="lg:flex lg:justify-between lg:gap-4">
          <Header />
          <Main />
        </div>
      </div>
    </motion.main>
  );
}

export default Home;
