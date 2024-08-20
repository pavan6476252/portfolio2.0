import { ObjectType, Field, Int } from '@nestjs/graphql'; 
import { BlogPost } from '../blogs/entities/blog-post.entity';
import { Project } from '../resume/projects/entities/projects.entity';
@ObjectType()
export class PaginatedBlogPostResult {
  @Field(() => Int)
  total: number;

  @Field(() => [BlogPost])
  result: BlogPost[];

  constructor({ total, result }: { total: number; result: BlogPost[] }) {
    this.total = total;
    this.result = result;
  }
}
@ObjectType()
export class PaginatedProjectResult {
  @Field(() => Int)
  total: number;

  @Field(() => [Project])
  result: Project[];

  constructor({ total, result }: { total: number; result: Project[] }) {
    this.total = total;
    this.result = result;
  }
}
