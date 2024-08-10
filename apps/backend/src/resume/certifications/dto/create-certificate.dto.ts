import { Field, InputType } from "@nestjs/graphql";
import { FileUpload, GraphQLUpload } from "graphql-upload-ts";

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

  @Field((type) => GraphQLUpload, { nullable: true })
  certificateFile?: FileUpload;

  @Field(() => [String])
  skillsGained: string[];

  @Field(() => Boolean)
  isActive: boolean;
}
