// create-education.dto.ts
import { InputType, Field, Float, Int } from '@nestjs/graphql';
import { IsString, IsOptional, IsNumber, Max, Min } from 'class-validator';

@InputType()
export class CreateEducationDto {
  @Field()
  @IsString()
  type: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  universityName?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  fieldOfStudy?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  degree?: string;

  @Field(() => Float, { nullable: true })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(10)
  grade?: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  schoolName?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  class?: string;

  @Field(() => Int)
  @IsNumber()
  startYear: number;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsNumber()
  endYear?: number;

  @Field(() => Float, { nullable: true })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(10)
  finalGPA?: number;
}
