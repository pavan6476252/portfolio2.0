import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Project } from "./entities/projects.entity";
import { CreateProjectDto } from "./dto/create-project.dto";
import { UpdateProjectDto } from "./dto/update-project.dto";
import { User } from "../../auth/user.entity";
import { CloudinaryService } from "../../upload/cloudinary.service";

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private cloudinaryService: CloudinaryService
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

    return this.projectRepository.save(project);
  }

  async updateProject(
    userId: number,
    id: number,
    updateProjectDto: UpdateProjectDto
  ): Promise<Project> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
    const project = await this.projectRepository.preload({
      id,
      ...updateProjectDto,
      author: user,
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

    return this.projectRepository.save(project);
  }

  async getProjectById(id: number): Promise<Project> {
    const project = await this.projectRepository.findOne({ where: { id } });
    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }
    return project;
  }

  async getAllProjects(): Promise<Project[]> {
    return this.projectRepository.find();
  }
  async getMyProjects(userId: number): Promise<Project[]> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
    return this.projectRepository.find({ where: { author: user } });
  }

  async deleteProject(userId: number, id: number): Promise<void> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const project = await this.projectRepository.findOne({
      where: {
        author: user,
        id: id,
      },
    });

    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }

    await this.projectRepository.remove(project);
  }
}