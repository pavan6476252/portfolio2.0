import { Module } from "@nestjs/common";
import { EducationModule } from "./education/education.module";
import { CloudinaryModule } from "../upload/cloudinary.module";
import { CloudinaryService } from "../upload/cloudinary.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ResumeProfile } from "./entities/resume-profile.entity";
import { ResumeProfileResolver } from "./resume.resolver";
import { ResumeProfileService } from "./resume.service";
import { User } from "../auth/user.entity";
import { Project } from "./projects/entities/projects.entity";
import { ProjectResolver } from "./projects/project.resolver";
import { ProjectService } from "./projects/project.service";
import { SearchModule } from "../search/search.module";
import { SearchService } from "../search/search.service";

@Module({
  imports: [
    EducationModule,
    CloudinaryModule,
    SearchModule,
    TypeOrmModule.forFeature([ResumeProfile, User, Project]),
  ],
  providers: [
    CloudinaryService,
    ResumeProfileService,
    ResumeProfileResolver,
    ProjectResolver,
    ProjectService,
    SearchService,
  ],
})
export class ResumeModule {}
