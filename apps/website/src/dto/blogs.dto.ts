import { IUserResponse } from "../store/dtos/user.dto";

export interface IBlogResposne {
  id: number;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string[];
  markdownContent?: string;
  slug?: string;
  coverImage?: string;
  socialImage?: string;
  author?: IUserResponse;
  comments?: ICommenResponse[];
  tags?: ITagResponse[];
  likes: number;
  createdAt?: string;
  updatedAt?: string;
  visible?: boolean;
}
export interface ICommenResponse {
    id?:number,
    content:string;
}
export interface ITagResponse {
    id?:number,
    name:string;
}


export interface ICreateBlogDto {
  metaDescription: string;
  metaKeywords: string[];
  metaTitle: string;
  markdownContent: string;
  socialImageFile?: File;
  coverImageFile: File|null;
  tags: string[];
  visible: boolean;
}
export interface IUpdateBlogDto {
  id?: number;
  metaDescription: string;
  metaKeywords: string[];
  metaTitle: string;
  markdownContent: string;
  socialImageFile?: File;
  coverImageFile?: File;
  coverImage?: string;
  socialImage?: string;
  tags: string[];
  visible: boolean;
}

export interface ICreateBlogResponse {
  id: string;
}
