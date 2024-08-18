import { IUserResponse } from "./user.dto";

export interface ISocialPlatform {
  link: string;
  name: string;
}

export interface ISkill {
  name: string;
  type: string;
}

export interface IAbility {
  type: string;
  title: string;
  description:string
}

export interface IResumeProfile {
  fullName?: string;
  tagline?: string;
  description?: string;
  heroTitle: string;
  heroDescription: string;
  domains: string[];
  socialPlatforms: ISocialPlatform[];
  developerTools: ISkill[];
  abilities: IAbility[];
  user: IUserResponse;
}
