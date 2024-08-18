import { Resolver, Query, Mutation, Args, Int, Context } from "@nestjs/graphql";
import { CreateResumeProfileDto } from "./dto/create-resume.dto";
import { UpdateResumeProfileDto } from "./dto/update-resume.dto";
import { ResumeProfile } from "./entities/resume-profile.entity";
import { ResumeProfileService } from "./resume.service";
import { Req, UseGuards } from "@nestjs/common";
import { JwtAdminOnlyAuthGuard } from "../auth/jwt-auth.guard";
import { ITokenPayload } from "../auth/auth.service";

@Resolver(() => ResumeProfile)
export class ResumeProfileResolver {
  constructor(private readonly resumeProfileService: ResumeProfileService) {}

  @Mutation(() => ResumeProfile)
  @UseGuards(JwtAdminOnlyAuthGuard)
  createResumeProfile(
    @Context("req") req: any,
    @Args("createResumeProfileDto")
    createResumeProfileDto: CreateResumeProfileDto
  ) {
    const user = req.user as ITokenPayload;
    return this.resumeProfileService.create(user.sub, createResumeProfileDto);
  }

  @Query(() => [ResumeProfile], { name: "resumeProfiles" })
  findAll() {
    return this.resumeProfileService.findAll();
  }

  @Query(() => ResumeProfile, {nullable:true })
  getPortfolio() {
    return this.resumeProfileService.getcurrentPortfolio();
  }

  @Query(() => ResumeProfile, { name: "resumeProfile" })
  @UseGuards(JwtAdminOnlyAuthGuard)
  findOne(@Context("req") req: any) {
    const user = req.user as ITokenPayload;
    return this.resumeProfileService.findOne(user.sub);
  }

  @Mutation(() => Boolean)
  @UseGuards(JwtAdminOnlyAuthGuard)
  updateResumeProfile(
    @Context("req") req: any,

    @Args("updateResumeProfileDto")
    updateResumeProfileDto: UpdateResumeProfileDto
  ) {
    const user = req.user as ITokenPayload;
    return this.resumeProfileService.update(user.sub, updateResumeProfileDto);
  }

  @Mutation(() => Boolean)
  @UseGuards(JwtAdminOnlyAuthGuard)
  async removeResumeProfile(@Context("req") req: any) {
    const user = req.user as ITokenPayload;
   return  this.resumeProfileService.remove(user.sub).then(()=>true);
    
  }
}
