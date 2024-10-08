import { IUserResponse } from "../store/dtos/user.dto";

export interface IProjectResposne {
  id: string;
  metaDescription?: string;
  metaKeywords?: string[];
  metaTitle?: string;
  markdownContent?: string;
  title: string;
  author?: IUserResponse;
  projectLink: string;
  bannerImg: string;
  startDate: Date;
  endDate: Date;
  techStack: string[];
  keypoints: string[];
  isActive?: boolean;
  slug?: string;
}

export interface ICreateProjectDto {
  metaDescription: string;
  metaKeywords: string[];
  metaTitle: string;
  markdownContent?: string;
  bannerImgFile?: File | null; // Optional file upload
  title: string; // Project title
  projectLink: string; // Link to the project
  startDate: string; // Project start date
  endDate: string; // Project end date
  techStack: string[]; // List of technologies used in the project
  keypoints: string[]; // Key points of the project
  isActive: boolean; // Project active status
}
export interface IUpdateProjectDto {
  id?: string;
  metaDescription: string;
  metaKeywords: string[];
  metaTitle: string;
  markdownContent?: string;
  bannerImgFile?: File | null; // Optional file upload
  bannerImg?: string;
  title?: string; // Project title
  projectLink?: string; // Link to the project
  startDate?: string; // Project start date
  endDate?: string; // Project end date
  techStack?: string[]; // List of technologies used in the project
  keypoints?: string[]; // Key points of the project
  isActive?: boolean; // Project active status
}
export interface ICreateProjectResponse {
  id: string;
}
