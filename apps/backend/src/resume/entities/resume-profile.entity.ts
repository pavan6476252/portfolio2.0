// resume-profile.entity.ts
import { ObjectType, Field, Int, InputType } from "@nestjs/graphql";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { User } from "../../auth/user.entity";
@ObjectType()
@Entity()
export class ResumeProfile {
  @Field((type) => Int,{nullable:true})
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => User, { nullable: true })
  @OneToOne(() => User, (user) => user.resumeProfile)
  @JoinColumn()
  user?: User;

  
  @Field({ nullable: true })
  @Column({ nullable: true })
  fullName?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  tagline?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  heroTitle?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  heroDescription?: string;

  @Field(() => [SocialPlatform], { nullable: true, defaultValue: [] })
  @Column("simple-json", { nullable: true, default: [] })
  socialPlatforms: SocialPlatform[];

  @Field(() => [String], { nullable: true, defaultValue: [] })
  @Column("simple-array", { nullable: true, default: [] })
  domains: string[];

  @Field({ nullable: true })
  @Column({ nullable: true })
  collegeName?: string;

  @Field(() => Int, { nullable: true })
  @Column({ nullable: true })
  graduationYear?: number;

  @Field(() => [Skill], { nullable: true, defaultValue: [] })
  @Column("simple-json", { nullable: true, default: [] })
  developerTools: Skill[];

  @Field(() => [Abilities], { nullable: true, defaultValue: [] })
  @Column("simple-json", { nullable: true, default: [] })
  abilities?: Abilities[];
}

@ObjectType()
export class Abilities {
  @Field()
  type: string;

  @Field()
  title: string;
  @Field()
  description: string;
}

@InputType()
export class AbilitiesInput {
  @Field()
  type: string;

  @Field()
  title: string;
  @Field()
  description: string;
}

@ObjectType()
export class Skill {
  @Field()
  type: string;

  @Field()
  name: string;
}

@InputType()
export class SkillInput {
  @Field()
  type: string;

  @Field()
  name: string;
}

@ObjectType()
export class SocialPlatform {
  @Field()
  link: string;

  @Field()
  name: string;
}

@InputType()
export class SocialPlatformInput {
  @Field()
  link: string;

  @Field()
  name: string;
}
