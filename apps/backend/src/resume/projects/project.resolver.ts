import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ProjectService } from './project.service';
import { Project } from '../entities/projects.entity';
import { UpdateProjectDto } from '../dto/update-project.dto';
import { CreateProjectDto } from '../dto/create-project.dto';
 
@Resolver(() => Project)
export class ProjectResolver {
  constructor(private readonly projectService: ProjectService) {}

  @Query(() => [Project])
  getAllProjects(): Promise<Project[]> {
    return this.projectService.getAllProjects();
  }

  @Query(() => Project)
  getProjectById(@Args('id', { type: () => Number }) id: number): Promise<Project> {
    return this.projectService.getProjectById(id);
  }

  @Mutation(() => Project)
  createProject(@Args('createProjectDto') createProjectDto: CreateProjectDto): Promise<Project> {
    return this.projectService.createProject(createProjectDto);
  }

  @Mutation(() => Project)
  updateProject(
    @Args('id', { type: () => Number }) id: number,
    @Args('updateProjectDto') updateProjectDto: UpdateProjectDto,
  ): Promise<Project> {
    return this.projectService.updateProject(id, updateProjectDto);
  }

  @Mutation(() => Boolean)
  deleteProject(@Args('id', { type: () => Number }) id: number): Promise<boolean> {
    return this.projectService.deleteProject(id).then(() => true);
  }
}
