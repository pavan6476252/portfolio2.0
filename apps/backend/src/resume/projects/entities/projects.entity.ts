import { Field, ObjectType } from "@nestjs/graphql";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../../auth/user.entity";
import { FileUpload } from "graphql-upload-ts";
import GraphQLJSON from "graphql-type-json";

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

  @Field((type) => Date, { nullable: true })
  @Column("date", { nullable: true })
  startDate: Date;

  @Field((type) => Date, { nullable: true })
  @Column("date", { nullable: true })
  endDate: Date;

  @Field(() => [String])
  @Column("text", { array: true })
  techStack: string[];

  @Field(() => String)
  @Column("text")
  keypoints: string;

  @Field(() => String)
  @Column("text", { array: true })
  desc: string;

  @Field(() => Boolean, { defaultValue: true })
  @Column("boolean", { default: true })
  isActive: boolean;
}
