import {
  Entity,
  Column,
  CreateDateColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  OneToOne,
} from "typeorm";
import { ObjectType, Field, ID } from "@nestjs/graphql";
import { BlogPost } from "../blogs/entities/blog-post.entity";
import { Comment } from "../blogs/entities/comment.entity";
import { Certification } from "../resume/certifications/entity/certifications.entity";
import { Experience } from "../resume/experience/entities/experience.entity"; 
import { ResumeProfile } from "../resume/entities/resume-profile.entity";
import { Project } from "../resume/projects/entities/projects.entity";
import { Education } from "../resume/education/entities/education.entity";

@ObjectType()
@Entity()
export class User {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  googleId: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  picture?: string;

  @Field()
  @Column()
  email: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  username: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  password?: string;

  @Field({ defaultValue: "user" })
  @Column({ default: "user" })
  role: string;

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @Field(() => Education)
  @OneToMany(() => Education, (edu) => edu.user)
  education?: Education;
  
  @Field(() => Project)
  @OneToMany(() => Project, (project) => project.author)
  projects?: Project;

  @Field(() => ResumeProfile, { nullable: true })
  @OneToOne(() => ResumeProfile, (resume) => resume.user)
  resumeProfile?: ResumeProfile;

  @Field(() => [BlogPost], { nullable: true })
  @OneToMany(() => BlogPost, (post) => post.author)
  blogPosts?: BlogPost[];

  @Field(() => [Comment], { nullable: true })
  @OneToMany(() => Comment, (comment) => comment.author)
  comments?: Comment[];

  @Field(() => [Experience], { nullable: true })
  @OneToMany(() => Experience, (experience) => experience.owner)
  experiences?: Experience[];

  @Field(() => [Certification], { nullable: true })
  @OneToMany(() => Certification, (certification) => certification.owner)
  certifications?: Certification[];
}
