import { TypeOrmModule } from "@nestjs/typeorm";
import { join } from "path";
import { ConfigModule } from "@nestjs/config";

import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { AuthModule } from "../auth/auth.module";
import { User } from "../auth/user.entity";
import { JwtModule } from "@nestjs/jwt";
import { TagService } from "../blogs/tag.service";
import { CommentService } from "../blogs/comment.service";
import { BlogPostService } from "../blogs/blogs.service";
import { BlogsModule } from "../blogs/blogs.module";
import { ResumeModule } from "../resume/resume.module";
import { BlogPost } from "../blogs/entities/blog-post.entity";
import { Comment } from "../blogs/entities/comment.entity";
import { Tag } from "../blogs/entities/tag.entity";
import { Certification } from "../resume/certifications/entity/certifications.entity";
import { Experience } from "../resume/experience/entities/experience.entity"; 
import { Project } from "../resume/projects/entities/projects.entity";
import { EmailModule } from "../mailer/mailer.module";
import { ResumeProfile } from "../resume/entities/resume-profile.entity";
import { CloudinaryModule } from "../upload/cloudinary.module";
import { CloudinaryService } from "../upload/cloudinary.service";
import GraphQLJSON from "graphql-type-json";
import { DateScalar } from "../common/date.scalar"; 
import { Education } from "../resume/education/entities/education.entity";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // TypeOrmModule.forRoot({
    //   type: "mongodb",
    //   url: "mongodb://localhost:27017/nxmonorepo",
    //   // url  : "mongodb+srv://pavan6476252:7b9mbednea@pavan.p9x1pth.mongodb.net/?retryWrites=true&w=majority&appName=pavan",
    //   database: "events",
    //   synchronize: true,
    //   // useUnifiedTopology: true,
    //   logging: "all",
    //   entities: [User,BlogPost,Comment,Tag],
    // }),

    TypeOrmModule.forRoot({
      type: "postgres",
      url:
        "postgresql://portfolio_owner:Hf6xvNPyX9Mw@ep-tight-mountain-a15msik3.ap-southeast-1.aws.neon.tech/portfolio?sslmode=require",
      entities: [
        User,
        BlogPost,
        Comment,
        Tag,
        Certification,
        Experience,
        Project,
        ResumeProfile,
        Education
      ],
      synchronize: true,
    }),

    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      context: ({ req, res }) => ({ req, res }),
      autoSchemaFile: join(process.cwd(), "apps/backend/src/schema.gql"),
    }),
    AuthModule,
    ResumeModule,
    BlogsModule,
    EmailModule,
  ],
  providers:[DateScalar]
})
export class AppModule {}
