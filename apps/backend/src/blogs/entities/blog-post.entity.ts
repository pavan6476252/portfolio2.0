import {
  Entity,
  Column,
  ManyToOne,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { ObjectType, Field, ID, Int } from "@nestjs/graphql";
import { User } from "../../auth/user.entity";
import { Tag } from "./tag.entity";
import { Comment } from "./comment.entity";

@ObjectType()
@Entity()
export class BlogPost {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  // SEO Meta Fields
  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  metaTitle: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true, type: "text" })
  metaDescription: string;

  @Field(() => [String], { nullable: true })
  @Column("text", { array: true, nullable: true })
  metaKeywords: string[];

  // Markdown Content Field
  @Field(() => String, { nullable: true })
  @Column({ type: "text", nullable: true })
  markdownContent: string;
  
  @Field((type) => String, { nullable: true })
  @Column()
  slug: string;

  @Field((type) => String, { nullable: true })
  @Column()
  coverImage?: string;

  @Field((type) => String, { nullable: true })
  @Column()
  socialImage?: string;

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User, (user) => user.blogPosts)
  author: User;

  @Field(() => [Comment], { nullable: true })
  @ManyToMany(() => Comment)
  @JoinTable()
  comments?: Comment[];

  @Field(() => [Tag], { nullable: true })
  @ManyToMany(() => Tag, (tag) => tag.posts)
  @JoinTable()
  tags: Tag[];

  @Field(() => Int, { nullable: true, defaultValue: 0 })
  @Column({ default: 0, nullable: true })
  likes: number;

  @Field(() => String, { nullable: true })
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String, { nullable: true })
  @UpdateDateColumn()
  updatedAt: Date;

  @Field((type) => Boolean, { defaultValue: true })
  @Column("bool", { default: true })
  visible: boolean;
}
