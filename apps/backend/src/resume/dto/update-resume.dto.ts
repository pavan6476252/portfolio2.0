import { InputType, PartialType } from '@nestjs/graphql'; 
import { CreateResumeProfileDto } from './create-resume.dto';

@InputType()
export class UpdateResumeProfileDto extends PartialType(CreateResumeProfileDto) {}
