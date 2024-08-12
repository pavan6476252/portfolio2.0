import { IUser } from "../store/dtos/user.dto";

export interface IProjectResposne {
  id: string;
  title: string;
  user?:IUser;
  projectLink: string;
  bannerImg: string;
startDate: Date;
  endDate: Date;
  techStack: [string];
  desc: string;
  keypoints: [string];
  isActive: boolean;
}

export interface ICreateProjectDto {
  bannerImgFile?: File | null; // Optional file upload
  title: string;                // Project title
  projectLink: string;          // Link to the project
  startDate: string;            // Project start date
  endDate: string;              // Project end date
  techStack: string[];          // List of technologies used in the project
  desc: string;                 // Description of the project
  keypoints: string[];          // Key points of the project
  isActive: boolean;            // Project active status
}
export interface IUpdateProjectDto {
  id:string,
  bannerImgFile?: File | null; // Optional file upload
  bannerImg?:string;
  title?: string;                // Project title
  projectLink?: string;          // Link to the project
  startDate?: string;            // Project start date
  endDate?: string;              // Project end date
  techStack?: string[];          // List of technologies used in the project
  desc?: string;                 // Description of the project
  keypoints?: string[];          // Key points of the project
  isActive?: boolean;            // Project active status
}
export interface ICreateProjectResponse {
  id: string;
}

export  const CREATE_PROJECT_MUTATION = `
   mutation CreateProject($bannerImgFile: Upload!, $desc: String!, $endDate: Date!, $techStack: [String!]!, $isActive: Boolean!, $keypoints: [String!]!, $projectLink: String!, $startDate: Date!, $title: String!) {
    createProject(createProjectDto: {
      bannerImgFile: $bannerImgFile
      desc: $desc
      endDate: $endDate
      techStack: $techStack
      isActive: $isActive
      keypoints: $keypoints
      projectLink: $projectLink
      startDate: $startDate
      title: $title
    }) {
      id
    }
  }
`;
