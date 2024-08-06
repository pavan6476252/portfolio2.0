import { InputType, Field } from "@nestjs/graphql";

@InputType()
export class FilterBlogPostDTO {
  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  content?: string;

  @Field(() => [String], { nullable: true })
  tags?: string[];

  @Field({ nullable: true })
  author?: string;
}
