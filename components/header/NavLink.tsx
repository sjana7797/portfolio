import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { NavLink as NavLinkInterface } from "../../typing";

type Props = { navLink: NavLinkInterface };

function NavLink({ navLink }: Props) {
  const router = useRouter();
  const { pathname } = router;
  return (
    <li
      className={`cursor-pointer transition-colors duration-300 hover:text-secondary ${
        pathname === navLink.link && "text-secondary"
      }`}
    >
      <Link href={navLink.link}>
        <a>{navLink.title}</a>
      </Link>
    </li>
  );
}

export default NavLink;
