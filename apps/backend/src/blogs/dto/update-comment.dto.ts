// update-comment.dto.ts
import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class UpdateCommentDTO {
  

  @Field({ nullable: true })
  content?: string;
}
