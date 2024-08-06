import { ObjectType, Field, Int } from '@nestjs/graphql';
import { User } from '../../auth/user.entity';
import { Tag } from '../entities/tag.entity';

@ObjectType()
export class BlogPostResponse {
  @Field()
  title: string;

  @Field()
  content: string;

  @Field(() => Int)
  likes: number;

  @Field(() => Int)
  commentCount: number; // Add this field

  @Field(() => User)
  author: User;

  @Field(() => [Tag])
  tags: Tag[];
}
