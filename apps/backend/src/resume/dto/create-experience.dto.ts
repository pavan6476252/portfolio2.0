import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreateExperienceDTO {
  @Field()
  company: string;

  @Field()
  role: string;

  @Field()
  starting: string;

  @Field()
  ending: string;

  @Field({ nullable: true })
  certificateLink?: string;

  @Field(() => [String])
  desc: string[];

  @Field(() => [String])
  skillsGained: string[];

  @Field(() => Boolean, { defaultValue: true })
  isActive: boolean;
}
