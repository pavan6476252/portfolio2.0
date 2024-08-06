import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ObjectType, Field, ID } from "@nestjs/graphql";
import { BlogPost } from "./blog-post.entity";
import { User } from "../../auth/user.entity";

@ObjectType()
@Entity()
export class Comment {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column("text")
  content: string;

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User, (user) => user.comments)
  author: User;

  @Field(() => BlogPost)
  @ManyToOne(() => BlogPost, (post) => post.comments)
  post: BlogPost;
}
