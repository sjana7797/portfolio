import Link from "next/link";
import { socials } from "../constants";

function Socials() {
  return (
    <ul className="ml-1 mt-8 flex items-center" aria-label="Social media">
      {socials.map((social, index) => {
        return (
          <li
            className="group mr-5 text-xs transition-transform duration-300 hover:scale-110"
            key={index}
          >
            <Link
              className="block hover:text-slate-200"
              href={social.href}
              target="_blank"
              rel="noreferrer"
            >
              <span className="sr-only">{social.name}</span>
              <social.icon className="text-slate-300 transition-colors duration-300 group-hover:text-teal-500" />
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export default Socials;
