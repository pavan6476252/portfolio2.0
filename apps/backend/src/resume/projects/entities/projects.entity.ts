import { Field, ObjectType } from "@nestjs/graphql";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../../auth/user.entity";

@Entity()
@ObjectType()
export class Project {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.projects)
  author: User;

  @Field(() => String, { nullable: true })
  @Column()
  bannerImg: string;

  @Field()
  @Column()
  title: string;

  @Field()
  @Column()
  projectLink: string;

  @Field(() => Date, { nullable: true })
  @Column({ type: "timestamptz", nullable: true })
  startDate: Date;

  @Field(() => Date, { nullable: true })
  @Column({ type: "timestamptz", nullable: true })
  endDate?: Date;

  @Field(() => [String])
  @Column("text", { array: true })
  techStack: string[];

  @Field(() => [String])
  @Column("text", { array: true })
  keypoints: string[];

  @Field(() => Boolean, { defaultValue: true })
  @Column("boolean", { default: true })
  isActive: boolean;

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
  @Column({nullable:true})
  slug: string;
}
