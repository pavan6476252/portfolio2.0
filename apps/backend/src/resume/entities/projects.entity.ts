import { Field, ObjectType } from "@nestjs/graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@ObjectType()
export class Project {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  title: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  projectLink?: string;

  
  @Field(() => String)
  @Column("date")
  startDate: string;


  @Field(() => [String])
  @Column("text", { array: true })
  techStack: string[];
  
  @Field(() => [String])
  @Column("text", { array: true })
  desc: string[];
 
  @Field(() => Boolean, { defaultValue: true })
  @Column("boolean", { default: true })
  isActive: boolean;
}
