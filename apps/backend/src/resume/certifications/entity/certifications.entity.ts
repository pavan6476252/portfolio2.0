import { Field, ObjectType } from "@nestjs/graphql";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../../auth/user.entity";

@Entity()
@ObjectType()
export class Certification {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.certifications)
  owner: User;

  @Field()
  @Column()
  title: string;

  @Field(() => [String])
  @Column("text", { array: true })
  desc: string[];

  @Field(type=>Date)
  @Column("date")
  starting: Date;
  
  @Field(type=>Date)
  @Column("date")
  ending: Date;

  @Field()
  @Column()
  certificateLink: string;

  @Field(() => [String])
  @Column("text", { array: true })
  skillsGained: string[];

  @Field((type) => Boolean, { defaultValue: true })
  @Column("boolean", { default: true })
  isActive: boolean;
}
