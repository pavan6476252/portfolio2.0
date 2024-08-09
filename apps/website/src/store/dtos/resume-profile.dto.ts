import { IUser } from "./user.dto";

export interface ISocialPlatform {
  link: string;
  name: string;
}

interface ISkill {
  name: string;
  type: string;
}

interface IAbility {
  type: string;
  title: string;
}

export interface IResumeProfile {
  fullName: string;
  tagline: string;
  description: string;
  heroTitle: string;
  heroDescription: string;
  domains: string[];
  socialPlatforms: ISocialPlatform[];
  developerTools: ISkill[];
  abilities: IAbility[];
  user: IUser;
}
