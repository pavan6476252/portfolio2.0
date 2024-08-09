import { InputType, Field, Int } from "@nestjs/graphql";
import { IsString, IsOptional, IsInt, IsArray } from "class-validator";
import {
  AbilitiesInput,
  SkillInput,
  SocialPlatformInput,
} from "../entities/resume-profile.entity";

@InputType()
export class CreateResumeProfileDto {
  @Field()
  @IsOptional()
  @IsString()
  fullName?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  tagline?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  description?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  heroTitle?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  heroDescription?: string;

  
  @Field(() => [SocialPlatformInput], { nullable: true })
  @IsOptional()
  socialPlatforms?: SocialPlatformInput[];

  @Field(() => [String], { nullable: true })
  @IsOptional()
  @IsArray()
  domains?: string[];

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  collegeName?: string;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  graduationYear?: number;

  @Field(() => [SkillInput], { nullable: true })
  @IsOptional()
  developerTools?: SkillInput[];

  @Field(() => [AbilitiesInput], { nullable: true })
  @IsOptional()
  abilities?: AbilitiesInput[];
}
