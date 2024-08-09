import { Module } from "@nestjs/common";
import { BlogPostResolver } from "./blogs.resolver";
import { BlogPostService } from "./blogs.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BlogPost } from "./entities/blog-post.entity";
import { Comment } from "./entities/comment.entity";
import { Tag } from "./entities/tag.entity";
import { User } from "../auth/user.entity";
import { CloudinaryModule } from "../upload/cloudinary.module";
import { CloudinaryService } from "../upload/cloudinary.service";
import { TagService } from "./tag.service";

@Module({
  imports: [TypeOrmModule.forFeature([BlogPost, Comment, Tag, User]),CloudinaryModule],
  providers: [BlogPostResolver, BlogPostService, CloudinaryService, TagService],
})
export class BlogsModule {}
