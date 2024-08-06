import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from "typeorm";
import { ObjectType, Field, ID } from "@nestjs/graphql";
import { BlogPost } from "./blog-post.entity";

@ObjectType()
@Entity()
export class Tag {
  @Field(() => ID, { nullable: true })
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ unique: true })
  name: string;

  @Field(() => [BlogPost], { nullable: true })
  @ManyToMany(() => BlogPost, (blog) => blog.tags)
  posts: BlogPost[];
}
