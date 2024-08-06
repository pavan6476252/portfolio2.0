import { Field, InputType, Int, ObjectType } from "@nestjs/graphql";
import { BlogPost } from "../entities/blog-post.entity";

@ObjectType()
export class BlogPostsResponse {
  @Field(() => [BlogPost])
  blogs: BlogPost[];

  @Field(() => Int)
  total: number;

  constructor(blogs: BlogPost[], total: number) {
    this.blogs = blogs;
    this.total = total;
  }
}
