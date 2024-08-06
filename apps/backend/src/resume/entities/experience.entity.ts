import { Field, ObjectType } from "@nestjs/graphql";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../auth/user.entity";

@Entity()
@ObjectType()
export class Experience {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.experiences)
  owner: User;

  @Field()
  @Column()
  company: string;

  @Field()
  @Column()
  role: string;

  @Field()
  @Column("date")
  starting: string;

  @Field()
  @Column("date")
  ending: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  certificateLink?: string;

  @Field(() => [String])
  @Column("text", { array: true })
  desc: string[];

  @Field(() => [String])
  @Column("text", { array: true })
  skillsGained: string[];

  @Field(() => Boolean, { defaultValue: true })
  @Column("boolean", { default: true })
  isActive: boolean;
}
