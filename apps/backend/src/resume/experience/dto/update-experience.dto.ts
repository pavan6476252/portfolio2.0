import { Field, InputType, PartialType } from "@nestjs/graphql";
import { CreateExperienceDTO } from "./create-experience.dto";

@InputType()
export class UpdateExperienceDTO extends PartialType(CreateExperienceDTO) {}
