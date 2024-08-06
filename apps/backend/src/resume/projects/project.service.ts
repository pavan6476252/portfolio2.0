import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from '../entities/projects.entity';
import { CreateProjectDto } from '../dto/create-project.dto';
import { UpdateProjectDto } from '../dto/update-project.dto';
@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
  ) {}

  async createProject(createProjectDto: CreateProjectDto): Promise<Project> {
    const project = this.projectRepository.create(createProjectDto);
    return this.projectRepository.save(project);
  }

  async updateProject(id: number, updateProjectDto: UpdateProjectDto): Promise<Project> {
    const project = await this.projectRepository.preload({
      id,
      ...updateProjectDto,
    });
    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
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

  async deleteProject(id: number): Promise<void> {
    const result = await this.projectRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }
  }
}
