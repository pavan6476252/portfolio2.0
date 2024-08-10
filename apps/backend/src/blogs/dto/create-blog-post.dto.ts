import { InputType, Field } from "@nestjs/graphql";
import { BlogPost } from "../entities/blog-post.entity";
import { Tag } from "../entities/tag.entity";
import { GraphQLUpload, FileUpload } from "graphql-upload-ts";

@InputType()
export class CreateBlogPostDTO {
  @Field()
  title: string;
  @Field()
  description: string;

  @Field(() => GraphQLUpload, { nullable: true })
  coverImageFile?: FileUpload;

  @Field(() => GraphQLUpload, { nullable: true })
  socialImageFile: FileUpload;

  @Field()
  body_markdown: string;

  @Field(() => [String])
  tags: string[];

  @Field({ defaultValue: true, nullable: true })
  visible: boolean;
}
