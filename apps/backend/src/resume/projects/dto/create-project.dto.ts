import { IsArray, IsBoolean, IsDate, IsOptional, IsString } from "class-validator";
import { Field, InputType } from "@nestjs/graphql";
import { FileUpload, GraphQLUpload, } from "graphql-upload-ts";
import { Project } from "../entities/projects.entity";

@InputType()
export class CreateProjectDto {
  @Field()
  @IsString()
  title: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  projectLink: string;

  @Field((type) => GraphQLUpload, { nullable: true })
  bannerImgFile: FileUpload;

  @Field(() => Date)
  @IsDate()
  startDate: Date;

  @Field(() => Date,{nullable:true})
  @IsDate()
  @IsOptional()
  endDate?: Date;

  @Field(() => [String])
  @IsArray()
  @IsString({ each: true })
  techStack: string[];

  @Field(() => [String])
  @IsArray()
  @IsString()
  keypoints: [string];

  @Field(() => Boolean, { defaultValue: true })
  @IsBoolean()
  isActive: boolean;


  @Field(() => String, { nullable: true })
  metaTitle: string;

  @Field(() => String, { nullable: true })
  metaDescription: string;

  @Field(() => [String], { nullable: true })
  metaKeywords: string[];

  @Field(() => String, { nullable: true })
  markdownContent: string;
}
