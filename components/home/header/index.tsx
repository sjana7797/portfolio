import Link from "next/link";
import React from "react";
import { UserDesignation, UserName } from "~/constants/home";
import { navs, profile } from "../constants";
import Nav from "./nav";
import Socials from "./social";
import { TypeAnimation } from "react-type-animation";

type Props = {};

function Header({}: Props) {
  return (
    <header className="lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-1/2 lg:flex-col lg:justify-between lg:py-24">
      <div>
        <h1 className="text-4xl font-bold uppercase italic tracking-tight text-slate-200 transition-colors duration-200 hover:text-cyan-500 sm:text-5xl">
          <Link href="/">{UserName}</Link>
        </h1>
        <h2 className="mt-3 text-lg font-medium tracking-tight text-teal-400 sm:text-xl">
          {UserDesignation}
        </h2>
        <TypeAnimation
          sequence={["Fullstack", 1000, "Frontend", 1000, "Backend", 1000]}
          wrapper="h3"
          className="text-3xl font-medium text-cyan-500 sm:text-2xl"
          cursor={true}
          repeat={Infinity}
          speed={20}
          deletionSpeed={10}
          preRenderFirstString
        />
        <p className="mt-4 max-w-xs leading-normal">{profile}</p>
        <nav className="nav hidden lg:block" aria-label="In-page jump links">
          <ul className="mt-16 w-max list-none">
            {navs.map((nav) => {
              return <Nav nav={nav} key={nav.href} />;
            })}
          </ul>
        </nav>
      </div>
      <Socials />
    </header>
  );
}

export default Header;
