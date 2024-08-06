import { IsArray, IsBoolean, IsOptional, IsString } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';


@InputType()
export class UpdateProjectDto {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  title?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  projectLink?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  startDate?: string;

  @Field(() => [String], { nullable: true })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  techStack?: string[];

  @Field(() => [String], { nullable: true })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  desc?: string[];

  @Field(() => Boolean, { defaultValue: true, nullable: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
