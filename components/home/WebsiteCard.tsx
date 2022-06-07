/* eslint-disable @next/next/no-img-element */
import { Dispatch, SetStateAction } from "react";
import { FiLink } from "react-icons/fi";
import { Website } from "../../typing";
import { urlFor } from "../../utils/sanityClient";

type Props = {
  setImage: (
    webImage: string,
    mobileImage: string,
    description: string
  ) => void;
  website: Website;
  setCounter: Dispatch<SetStateAction<number>>;
  index: number;
};

function WebsiteCard({ setImage, website, setCounter, index }: Props) {
  const webImage = `${urlFor(website.web_image.asset._ref)}`;
  const mobileImage = `${urlFor(website.mobile_image.asset._ref)}`;
  const changeImage = () => {
    setImage(webImage, mobileImage, website.description);
    setCounter(index);
  };
  return (
    <a
      href={website.link}
      target="_blank"
      rel="noreferrer"
      className="group flex cursor-pointer select-none snap-start flex-col items-center space-y-2 rounded-lg border border-base-content/40 bg-base-200 p-2 shadow-md"
      onMouseEnter={changeImage}
      onClick={changeImage}
    >
      <div className="min-h-[9rem] min-w-[16rem] overflow-hidden rounded-2xl lg:min-h-[18rem] lg:min-w-[32rem]">
        <img
          src={`${urlFor(website.web_image.asset._ref)}`}
          className="transform object-cover transition-transform duration-300 group-hover:scale-105"
          alt=""
        />
      </div>
      <h3 className="text-xl text-secondary">{website.name}</h3>
      <div className="mt-5 flex items-center space-x-1 self-end">
        <span>
          <FiLink className="text-secondary/50" />
        </span>
        <button className="btn btn-primary btn-sm">go to website</button>
      </div>
    </a>
  );
}

export default WebsiteCard;
