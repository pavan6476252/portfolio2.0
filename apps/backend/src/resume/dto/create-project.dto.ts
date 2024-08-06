import { IsArray, IsBoolean, IsOptional, IsString } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateProjectDto {
  @Field()
  @IsString()
  title: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  projectLink?: string;

  @Field(() => String)
  @IsString()
  startDate: string;

  @Field(() => [String])
  @IsArray()
  @IsString({ each: true })
  techStack: string[];

  @Field(() => [String])
  @IsArray()
  @IsString({ each: true })
  desc: string[];

  @Field(() => Boolean, { defaultValue: true })
  @IsBoolean()
  isActive: boolean;
}
