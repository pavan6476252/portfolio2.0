import { InputType, Field } from "@nestjs/graphql";
import { BlogPost } from "../entities/blog-post.entity";
import { Tag } from "../entities/tag.entity";
import { GraphQLUpload, FileUpload } from "graphql-upload-ts";

@InputType()
export class CreateBlogPostDTO {

  @Field(() => GraphQLUpload, { nullable: true })
  coverImageFile?: FileUpload;

  @Field(() => GraphQLUpload, { nullable: true })
  socialImageFile: FileUpload;

  @Field(() => [String], { nullable: true })
  tags: string[];

  @Field((type) => Boolean, { defaultValue: true })
  visible: boolean;

  // SEO Meta Fields
  @Field(() => String, { nullable: true })
  metaTitle: string;

  @Field(() => String, { nullable: true })
  metaDescription: string;

  @Field(() => [String], { nullable: true })
  metaKeywords: string[];

  // Markdown Content Field
  @Field(() => String, { nullable: true })
  markdownContent: string;
}
