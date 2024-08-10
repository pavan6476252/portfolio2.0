import { Args, Context, Mutation, Query, Resolver } from "@nestjs/graphql";
import { ProjectService } from "./project.service";
import { Project } from "./entities/projects.entity";
import { UpdateProjectDto } from "./dto/update-project.dto";
import { CreateProjectDto } from "./dto/create-project.dto";
import { UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../../auth/jwt-auth.guard";
import { ITokenPayload } from "../../auth/auth.service";

@Resolver(() => Project)
export class ProjectResolver {
  constructor(private readonly projectService: ProjectService) {}

  @Query(() => [Project])
  getAllProjects(): Promise<Project[]> {
    return this.projectService.getAllProjects();
  }

  @Query(() => [Project])
  @UseGuards(JwtAuthGuard)
  getMyProjects(@Context("req") req: any): Promise<Project[]> {
    const { sub } = req.user as ITokenPayload;
    return this.projectService.getMyProjects(sub);
  }

  @Query(() => Project)
  getProjectById(
    @Args("id", { type: () => Number }) id: number
  ): Promise<Project> {
    return this.projectService.getProjectById(id);
  }

  @Mutation(() => Project)
  @UseGuards(JwtAuthGuard)
  createProject(
    @Context("req") req: any,
    @Args("createProjectDto") createProjectDto: CreateProjectDto
  ): Promise<Project> {
    const { sub } = req.user as ITokenPayload;
    return this.projectService.createProject(sub, createProjectDto);
  }

  @Mutation(() => Project)
  @UseGuards(JwtAuthGuard)
  updateProject(
    @Context("req") req: any,
    @Args("id", { type: () => Number }) id: number,
    @Args("updateProjectDto") updateProjectDto: UpdateProjectDto
  ): Promise<Project> {
    const { sub } = req.user as ITokenPayload;
  
    return this.projectService.updateProject(sub,id, updateProjectDto);
  }

  @Mutation(() => Boolean)
  @UseGuards(JwtAuthGuard)
  async deleteProject(
    @Context("req") req: any,
    @Args("id", { type: () => Number }) id: number
  ): Promise<boolean> {
    const { sub } = req.user as ITokenPayload;
    return this.projectService.deleteProject(sub, id).then(() => true);
  }
}
