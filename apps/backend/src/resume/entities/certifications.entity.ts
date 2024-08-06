import { Field, ObjectType } from "@nestjs/graphql";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../auth/user.entity";

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

  @Field()
  @Column("date")
  starting: string;

  @Field()
  @Column("date")
  ending: string;

  @Field()
  @Column()
  certificateLink: string;

  @Field(() => [String])
  @Column("text", { array: true })
  skillsUsed: string[];

  @Field((type) => Boolean, { defaultValue: true })
  @Column("boolean", { default: true })
  isActive: Boolean;
}
