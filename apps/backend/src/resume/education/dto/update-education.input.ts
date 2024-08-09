// update-education.dto.ts
import { InputType, PartialType } from '@nestjs/graphql';
import { CreateEducationDto } from './create-education.input';

@InputType()
export class UpdateEducationDto extends PartialType(CreateEducationDto) {}
