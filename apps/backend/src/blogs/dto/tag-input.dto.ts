import { InputType, Field, ID } from "@nestjs/graphql";

@InputType()
export class TagInput {
  @Field(() => ID)
  id: number;

  @Field()
  name: string;
}
