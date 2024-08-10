import { Resolver, Query, Mutation, Args, Int, Context } from "@nestjs/graphql";
import { EducationService } from "./education.service";
import { Education } from "./entities/education.entity";
import { CreateEducationDto } from "./dto/create-education.input";
import { UpdateEducationDto } from "./dto/update-education.input";
import { UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../../auth/jwt-auth.guard";
import { ITokenPayload } from "../../auth/auth.service";

@Resolver(() => Education)
export class EducationResolver {
  constructor(private readonly educationService: EducationService) {}

  @Mutation(() => Education)
  @UseGuards(JwtAuthGuard)
  createEducation(
    @Context("req") req: any,
    @Args("createEducationDto") createEducationDto: CreateEducationDto
  ) {
    const { sub } = req.user as ITokenPayload;
    return this.educationService.create(sub, createEducationDto);
  }

  @Query(() => [Education], { name: "educations" })
  findAll() {
    return this.educationService.findAll();
  }

  @Query(() => Education, { name: "education" })
  findOne(@Args("id", { type: () => Int }) id: number) {
    return this.educationService.findOne(id);
  }

  @Query(() => [Education], { name: "myEducations" })
  @UseGuards(JwtAuthGuard)
  findMyEducations(
    @Context("req") req: any,
    @Args("id", { type: () => Int }) id: number
  ) {
    const { sub } = req.user as ITokenPayload;
    return this.educationService.findMyEducations(sub,id);
  }

  @Mutation(() => Education)
  @UseGuards(JwtAuthGuard)
  updateEducation(
    @Context("req") req: any,
    @Args("id", { type: () => Int }) id: number,
    @Args("updateEducationDto") updateEducationDto: UpdateEducationDto
  ) {
    const { sub } = req.user as ITokenPayload;
    return this.educationService.update(sub,id, updateEducationDto);
  }

  @Mutation(() => Boolean)
  @UseGuards(JwtAuthGuard)
  removeEducation(
    @Context("req") req: any,
    @Args("id", { type: () => Int }) id: number) {
    const { sub } = req.user as ITokenPayload;
    this.educationService.remove(sub,id);
    return true;
  }
}
