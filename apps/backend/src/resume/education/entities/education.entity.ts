// education.entity.ts
import { ObjectType, Field, Int } from "@nestjs/graphql";
import { User } from "apps/backend/src/auth/user.entity";
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";

@ObjectType()
@Entity()
export class Education {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.education)
  user: User;

  @Field()
  @Column()
  type: string; // "College" or "School"

  @Field({ nullable: true })
  @Column({ nullable: true })
  universityName?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  fieldOfStudy?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  degree?: string;

  @Field({ nullable: true })
  @Column({ type: "float", nullable: true })
  grade?: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  schoolName?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  class?: string;

  @Field()
  @Column()
  startYear: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  endYear?: number;

  @Field({ nullable: true })
  @Column({ type: "float", nullable: true })
  finalGPA?: number;
}
