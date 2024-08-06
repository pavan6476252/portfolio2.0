import { InputType, Field } from "@nestjs/graphql";

@InputType()
export class FilterInput {
  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  content?: string;

  @Field(() => [String], { nullable: true })
  tags?: string[];
}
