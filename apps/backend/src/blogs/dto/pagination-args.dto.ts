import { ArgsType, Field, Int } from "@nestjs/graphql";

@ArgsType()
export class PaginationArgs {
  @Field(() => Int, { defaultValue: 0 })
  offset: number;

  @Field(() => Int, { defaultValue: 10 })
  limit: number;
}
