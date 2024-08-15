import { ObjectType, Field, Int, ID } from "@nestjs/graphql";
import { User } from "../../auth/user.entity";
import { Tag } from "../entities/tag.entity";

@ObjectType()
export class BlogPostResponse {
  @Field(() => ID)
  
  id: number;
 
   // SEO Meta Fields
   @Field(() => String, { nullable: true })
   metaTitle: string;
 
   @Field(() => String, { nullable: true })
   metaDescription: string;
 
   @Field(() => [String], { nullable: true })
   metaKeywords: string[];
 
   // Markdown Content Field
   @Field(() => String, { nullable: true })
   markdownContent: string;

  @Field((type) => String, { nullable: true })
  slug: string;

  @Field((type) => String, { nullable: true })
  coverImage?: string;

  @Field((type) => String, { nullable: true })
  socialImage?: string;
 

  @Field(() => User, { nullable: true })
  author: User;

  @Field(() => [Comment], { nullable: true })
   
  comments?: Comment[];

  @Field(() => [Tag], { nullable: true })
 
  tags?: Tag[];

  @Field(() => Int, { nullable: true, defaultValue: 0 })
  likes: number;

  @Field(() => String, { nullable: true })
  createdAt: Date;

  @Field(() => String, { nullable: true })
  updatedAt: Date;

  @Field((type) => Boolean, { defaultValue: true })
  visible: boolean;

  
}
