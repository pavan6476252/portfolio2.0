import { Module } from "@nestjs/common";
import { EducationModule } from "./education/education.module";
import { CloudinaryModule } from "../upload/cloudinary.module";
import { CloudinaryService } from "../upload/cloudinary.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ResumeProfile } from "./entities/resume-profile.entity";
import { ResumeProfileResolver } from "./resume.resolver";
import { ResumeProfileService } from "./resume.service";
import { User } from "../auth/user.entity";

@Module({
  imports: [
    EducationModule,
    CloudinaryModule,
    TypeOrmModule.forFeature([ResumeProfile,User]),
  ],
  providers: [CloudinaryService, ResumeProfileService, ResumeProfileResolver,],
})
export class ResumeModule {}
