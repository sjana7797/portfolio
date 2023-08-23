import Link from "next/link";
import type { Nav } from "../type";

type Props = {
  nav: Nav;
};

function Nav({ nav }: Props) {
  return (
    <li>
      <Link
        shallow
        href={nav.href}
        className="active group flex items-center py-3"
      >
        <span className="nav-indicator mr-4 h-px w-8 bg-slate-600 transition-all group-hover:w-16 group-hover:bg-slate-200 group-focus-visible:w-16 group-focus-visible:bg-slate-200 motion-reduce:transition-none"></span>
        <span className="nav-text text-xs font-bold uppercase  tracking-widest text-slate-500 group-hover:text-slate-200 group-focus-visible:text-slate-200">
          {nav.name}
        </span>
      </Link>
    </li>
  );
}

export default Nav;
