import { IconType } from "react-icons";
import { socialLinks as socialLinksObj } from "../config/socialLinks";

export const socialLinks: { link: string; Icon: IconType }[] =
  Object.values(socialLinksObj);
