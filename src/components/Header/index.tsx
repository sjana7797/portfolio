"use client";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";
import { Button } from "../../../components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import LavaPlanet from "../../assets/images/lava.webp";
import Link from "next/link";

type Props = {};

function Header({}: Props) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const body = document.querySelector("body");
    if (!body) return;
    if (show) {
      body.classList.add("overflow-y-hidden");
    } else {
      body.classList.remove("overflow-y-hidden");
    }
  }, [show]);
  return (
    <header className="fixed top-0 flex justify-end w-screen p-5 z-max">
      <AnimatePresence>
        {show && (
          <motion.div className="fixed top-0 bottom-0 left-0 right-0 flex">
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{
                x: "-100%",
              }}
              transition={{ duration: 0.5, type: "spring" }}
              className="w-2/5 hidden sm:block bg-blue-500/40 backdrop-blur"
            >
              <img
                src={LavaPlanet.src}
                className="object-contain animate-bounce"
              />
            </motion.div>
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{
                x: "100%",
              }}
              transition={{ duration: 0.5, type: "spring" }}
              className="flex-1 bg-slate-800 flex flex-col gap-3 items-center justify-center p-2 list-none text-4xl md:text-3xl xl:text-5xl text-slate-200 font-bold uppercase"
            >
              <Link
                href={"/"}
                className="cursor-pointer hover:tracking-widest transition-all duration-500 ease-in-out"
                onClick={() => {
                  setShow(false);
                }}
              >
                Home
              </Link>
              <Link
                href={"/about"}
                className="cursor-pointer hover:tracking-widest transition-all duration-500 ease-in-out"
                onClick={() => {
                  setShow(false);
                }}
              >
                About
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Button
        variant="ghost"
        className="cursor-pointer hover:bg-slate-800/60 active:scale-90 transition-transform duration-300 ease-in-out z-50"
        onClick={() => {
          setShow((prev) => !prev);
        }}
      >
        {show ? (
          <AiOutlineClose className="w-10 h-10 text-blue-500" />
        ) : (
          <HiOutlineMenuAlt3 className="w-10 h-10 text-blue-500" />
        )}
      </Button>
    </header>
  );
}

export default Header;
