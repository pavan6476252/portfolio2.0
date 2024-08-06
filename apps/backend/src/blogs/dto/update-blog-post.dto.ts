import { InputType, Field, ID } from "@nestjs/graphql";
import { TagInput } from "./tag-input.dto";
import { BlogPost } from "../entities/blog-post.entity";
import { Tag } from "../entities/tag.entity";
import { FileUpload, GraphQLUpload, Upload } from "graphql-upload-ts";

@InputType()
export class UpdateBlogPostDTO {
  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  description?: string;

  @Field((type) => GraphQLUpload, { nullable: true })
  coverImageFile?: FileUpload;

  @Field((type) => GraphQLUpload, { nullable: true })
  socialImageFile?: FileUpload;

  @Field({ nullable: true })
  body_markdown?: string;

  @Field(() => [String], { nullable: true })
  tags?: string[];

  @Field(() => Boolean, { nullable: true })
  visible?: boolean;
}
