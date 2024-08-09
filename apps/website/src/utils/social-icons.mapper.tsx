import { IconType } from "react-icons";
import {
  FaDev,
  FaStackOverflow,
  FaBehance,
  FaCodepen,
  FaDribbble,
  FaFacebook,
  FaGithubAlt,
  FaGitlab,
  FaLinkedin,
  FaMedium,
  FaTwitter,
  FaYoutube,
  FaNotdef,
  FaInstagram,
} from "react-icons/fa6";
import { ISocialPlatform } from "../store/dtos/resume-profile.dto";

export interface ISocialLinks {
  name: string;
  icon?: any;
  link: string;
}

export const SocialIconsList: ISocialLinks[] = [
  { name: "LinkedIn", icon: FaLinkedin, link: "" },
  { name: "Instagram", icon: FaInstagram, link: "" },
  { name: "Github", icon: FaGithubAlt, link: "" },
  { name: "GitLab", icon: FaGitlab, link: "" },
  { name: "Twitter", icon: FaTwitter, link: "" },
  { name: "Medium", icon: FaMedium, link: "" },
  { name: "Dev.to", icon: FaDev, link: "" },
  { name: "Stack-Overflow", icon: FaStackOverflow, link: "" },
  { name: "Youtube", icon: FaYoutube, link: "" },
  { name: "Behance", icon: FaBehance, link: "" },
  { name: "Facebook", icon: FaFacebook, link: "" },
  { name: "Dribble", icon: FaDribbble, link: "" },
  { name: "CodePen", icon: FaCodepen, link: "" },
];
export const getIconByName = (name: string) => {
  switch (name.toLowerCase()) {
    case "linkedin":
      return FaLinkedin;
    case "instagram":
      return FaInstagram;
    case "github":
      return FaGithubAlt;
    case "gitlab":
      return FaGitlab;
    case "twitter":
      return FaTwitter;
    case "medium":
      return FaMedium;
    case "dev.to":
      return FaDev;
    case "stack-overflow":
      return FaStackOverflow;
    case "youtube":
      return FaYoutube;
    case "behance":
      return FaBehance;
    case "facebook":
      return FaFacebook;
    case "dribble":
      return FaDribbble;
    case "codepen":
      return FaCodepen;
    default:
      return FaNotdef;
  }
};