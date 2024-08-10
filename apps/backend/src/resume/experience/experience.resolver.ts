import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Experience } from "./entities/experience.entity"; 
import { CreateExperienceDTO } from "./dto/create-experience.dto";
import { UpdateExperienceDTO } from "./dto/update-experience.dto";
import { ExperiencesService } from "./experience.service";

@Resolver(() => Experience)
export class ExperiencesResolver {
  constructor(private readonly experiencesService: ExperiencesService) {}

  @Query(() => [Experience])
  async getExperiences(): Promise<Experience[]> {
    return this.experiencesService.findAll();
  }

  @Query(() => Experience)
  async getExperience(@Args("id") id: number): Promise<Experience> {
    return this.experiencesService.findOne(id);
  }

  @Mutation(() => Experience)
  async createExperience(
    @Args("createExperienceDto") createExperienceDto: CreateExperienceDTO
  ): Promise<Experience> {
    return this.experiencesService.create(createExperienceDto);
  }

  @Mutation(() => Experience)
  async updateExperience(
    @Args("id") id: number,
    @Args("updateExperienceDto") updateExperienceDto: UpdateExperienceDTO
  ): Promise<Experience> {
    return this.experiencesService.update(id, updateExperienceDto);
  }

  @Mutation(() => Boolean)
  async deleteExperience(@Args("id") id: number): Promise<boolean> {
    await this.experiencesService.remove(id);
    return true;
  }
}
