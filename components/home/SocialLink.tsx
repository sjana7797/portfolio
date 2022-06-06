import { IconType } from "react-icons";

type Props = { socialLink: { link: string; Icon: IconType } };

const SocialLink = ({ socialLink }: Props) => {
  return (
    <a href={socialLink.link} target="_blank" rel="noreferrer">
      <socialLink.Icon className="cursor-pointer text-3xl transition-all duration-300 hover:-translate-y-1 hover:text-primary active:text-secondary md:text-4xl" />
    </a>
  );
};

export default SocialLink;
