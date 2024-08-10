import { Field, InputType, PartialType } from "@nestjs/graphql";
import { CreateCertificationDTO } from "./create-certificate.dto";

@InputType()
export class UpdateCertificationDTO extends PartialType(CreateCertificationDTO) {}
