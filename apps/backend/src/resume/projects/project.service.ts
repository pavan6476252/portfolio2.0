import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Project } from "./entities/projects.entity";
import { CreateProjectDto } from "./dto/create-project.dto";
import { UpdateProjectDto } from "./dto/update-project.dto";
import { User } from "../../auth/user.entity";
import { CloudinaryService } from "../../upload/cloudinary.service";
import { IndexNames, SearchService } from "../../search/search.service";
import { SearchResult } from "../../search/dto/search-results.dto";

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private cloudinaryService: CloudinaryService,
    private searchService: SearchService
  ) {}

  async createProject(
    userId: number,
    createProjectDto: CreateProjectDto
  ): Promise<Project> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const { bannerImgFile } = createProjectDto;
    const { filename, createReadStream } = await bannerImgFile;
    const uploadRes = await this.cloudinaryService.uploadStream(
      createReadStream,
      filename,
      "projects"
    );

    const project = this.projectRepository.create({
      ...createProjectDto,
      author: user,
      bannerImg: uploadRes.secure_url,
    });

    const newProject = await this.projectRepository.save(project);
    if (newProject.isActive) {
      await this.searchService.addorUpdateDataInIndex<SearchResult>({
        objectID: newProject.id.toString(),
        body: new SearchResult({
          type: "project",
          id: newProject.id.toString(),
          title: newProject.title,
          body: newProject.markdownContent,
          desc: newProject.metaDescription,
          keywords: newProject.metaKeywords,
          image: newProject.bannerImg,
        }),
        type: "project",
      });
    }

    return newProject;
  }

  async updateProject(
    userId: number,
    id: number,
    updateProjectDto: UpdateProjectDto
  ): Promise<Project> {
    const project = await this.projectRepository.preload({
      id,
      ...updateProjectDto,
      author: { id: userId },
    });
    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }

    const { bannerImgFile } = updateProjectDto;
    if (bannerImgFile) {
      const { filename, createReadStream } = await bannerImgFile;
      const uploadRes = await this.cloudinaryService.uploadStream(
        createReadStream,
        filename,
        "projects"
      );

      if (project.bannerImg) {
        await this.cloudinaryService.deleteFile(project.bannerImg);
      }

      project.bannerImg = uploadRes.secure_url;
    }

    const newProject = await this.projectRepository.save(project);
    if (newProject.isActive) {
      await this.searchService.addorUpdateDataInIndex<SearchResult>({
        objectID: newProject.id.toString(),
        body: new SearchResult({
          type: "project",
          id: newProject.id.toString(),
          title: newProject.title,
          body: newProject.markdownContent,
          desc: newProject.metaDescription,
          keywords: newProject.metaKeywords,
          image: newProject.bannerImg,
        }),
        type: "project",
      });
    } else {
      await this.searchService.removeDataFromIndex({
        objectID: newProject.id.toString(),
        type: "project",
      });
    }

    return newProject;
  }

  async getProjectById(id: number): Promise<Project> {
    const project = await this.projectRepository.findOne({
      where: { id: id },
      relations: ["author"],
    });
    console.log(project);
    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }
    return project;
  }

  async getAllProjects(): Promise<Project[]> {
    return this.projectRepository.find({ relations: ["author"] });
  }
  async getMyProjects(userId: number): Promise<Project[]> {
    return await this.projectRepository.find({
      where: { author: { id: userId } },
    });
  }
  async getCurrentUserActiveProjects(): Promise<Project[]> {
    try {
      const user = await this.userRepository.findOne({
        where: { role: "admin" },
      });
      console.log("user", user.id);
      if (!user) {
        return [];
      }
      return await this.projectRepository.find({
        where: { author: { id: user.id }, isActive: true },
        relations: ["author"],
      });
    } catch (e) {
      console.log(e);
      throw new NotFoundException("No projects found ");
    }
  }

  async deleteProject(userId: number, id: number): Promise<void> {
    const project = await this.projectRepository.findOne({
      where: {
        author: { id: userId },
        id: id,
      },
    });

    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }

    const removedProject = await this.projectRepository.remove(project);
    console.log(removedProject);

    const newProject = await this.projectRepository.save(project);
    await this.searchService.removeDataFromIndex({
      objectID: newProject.id.toString(),
      type: "project",
    });
  }
}
