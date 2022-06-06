import React from "react";
import { navLinks } from "../../config/navLinks";
import NavLink from "./NavLink";

type Props = {};

const Nav = (props: Props) => {
  return (
    <nav className="max-w-2xl grow">
      <ul className="flex w-full justify-evenly text-sm sm:text-base md:text-lg">
        {navLinks.map((navLink, index) => (
          <NavLink key={index} navLink={navLink} />
        ))}
      </ul>
    </nav>
  );
};

export default Nav;
