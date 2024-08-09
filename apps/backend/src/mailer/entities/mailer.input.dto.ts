import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class MailInput {
  @Field()
  to: string;

  @Field()
  subject: string;

  @Field()
  html: string;
}
