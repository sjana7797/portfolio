import { IoLogoReact, IoCodeSlash } from "react-icons/io5";
import { socialLinks } from "../../utils/socialLinks";
import SocialLink from "./SocialLink";
import { Intro as IntroInterface } from "../../typing";

type Props = { myIntro: IntroInterface };

function Intro({ myIntro }: Props) {
  const { description, designation, quick_intro } = myIntro;
  return (
    <section className="flex flex-col space-y-10">
      <div className="flex w-full flex-col items-center space-y-5 md:flex-row md:justify-between md:space-y-0">
        <div className="flex space-x-5 md:mx-0">
          <div className="aspect-square w-16 rounded-2xl bg-red-300"></div>
          <div>
            <h1 className="text-xl font-bold text-primary md:text-3xl">
              Sanjay Jana
            </h1>
            <h2 className="font-mono font-medium text-accent">{designation}</h2>
          </div>
        </div>
        <div className="text-neutral-600/80 flex max-w-sm grow justify-evenly space-x-5 md:space-x-0">
          {socialLinks.map((socialLink, index) => (
            <SocialLink socialLink={socialLink} key={index} />
          ))}
        </div>
      </div>
      <div>
        <p className="text-base font-medium md:text-base xl:text-xl">
          {description}
        </p>
      </div>
      <div className="flex flex-col space-y-5">
        <h2 className="text-xl font-semibold text-secondary">Quick Intro</h2>
        <ul className="flex flex-col space-y-2 text-sm md:text-base xl:text-lg">
          <li className="flex items-center space-x-2 md:space-x-4">
            <span className="inline">
              <IoLogoReact className="text-xl text-blue-500 md:text-3xl" />
            </span>
            <span className="inline">
              Currently working as React Developer <strong>@ValarTech</strong>
            </span>
          </li>
          <li className="flex items-center space-x-2 md:space-x-4">
            <span className="inline">
              <IoCodeSlash className="text-xl text-blue-500 md:text-3xl" />
            </span>
            <span className="inline">
              Previously, <strong>@TCS</strong> as System Engineer
            </span>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default Intro;
