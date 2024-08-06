import { InputType, Field, ID } from "@nestjs/graphql";
import { User } from "../../auth/user.entity";
import { TagInput } from "./tag-input.dto";

@InputType()
export class UpdateBlogPostDTO {
  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  content?: string;

  @Field(() => [TagInput], { nullable: true }) 
  tagIds?: TagInput[];
}
