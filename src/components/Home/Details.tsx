"use client";
import Link from "next/link";
import LiIcon from "./LiIcon";
import { useRef } from "react";
import { motion } from "framer-motion";

type Props = {
  position: string;
  company: string;
  companyLink: string;
  time: string;
  address: string;
  work: string;
};

function Details(props: Props) {
  const { address, company, companyLink, position, time, work } = props;
  const scrollRef = useRef<HTMLLIElement | null>(null);

  return (
    <li
      ref={scrollRef}
      className="w-4/5 md:w-3/5 flex flex-col items-center justify-between"
    >
      <LiIcon scrollRef={scrollRef} />
      <motion.div
        initial={{ y: 50 }}
        whileInView={{ y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, type: "spring" }}
      >
        <h3 className="capitalize font-bold text-lg md:text-2xl">
          {position}&nbsp;
          <Link
            target="_blank"
            className="text-blue-500 capitalize"
            href={companyLink}
          >
            @{company}
          </Link>
        </h3>
        <span className="capitalize md:text-base text-sm font-medium text-slate-200/75">
          {time} | {address}
        </span>
        <p className="font-medium md:text-base text-sm w-full">{work}</p>
      </motion.div>
    </li>
  );
}

export default Details;
