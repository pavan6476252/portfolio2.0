import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreateCertificationDTO {
  @Field()
  title: string;

  @Field(() => [String])
  desc: string[];

  @Field()
  starting: string;

  @Field()
  ending: string;

  @Field()
  certificateLink: string;

  @Field(() => [String])
  skillsUsed: string[];
}
