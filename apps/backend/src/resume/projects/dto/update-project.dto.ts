import { IsArray, IsBoolean, IsOptional, IsString } from "class-validator";
import { Field, InputType, PartialType } from "@nestjs/graphql";
import { CreateProjectDto } from "./create-project.dto";

@InputType()
export class UpdateProjectDto extends PartialType(CreateProjectDto) {}
