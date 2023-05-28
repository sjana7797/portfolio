"use client";
import Experience from "@/components/Home/Experience";
import Hero from "@/components/Home/Hero";
import Skills from "@/components/Home/Skills";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main>
      <Hero />
      <motion.div
        initial={{ x: -500 }}
        whileInView={{ x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, type: "spring" }}
        className="my-10 bg-slate-800 pt-10 pb-[150px] rounded-b-[400px] shadow-2xl border-2 border-slate-700 md:mx-5 mx-2"
      >
        <Experience />
      </motion.div>
      <Skills />
    </main>
  );
}
