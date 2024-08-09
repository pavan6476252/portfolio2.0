import { InputType, Field } from "@nestjs/graphql"; 
import { GraphQLUpload, FileUpload } from "graphql-upload-ts";
import { User } from "../user.entity";

@InputType()
export class UserUpdateInputDTO  {
 
  @Field(() => GraphQLUpload, { nullable: true })
  profileFile?: FileUpload;
 }
