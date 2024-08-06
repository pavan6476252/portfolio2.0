import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class RegisterInput {
  @Field()
  googleId: string;

  @Field()
  email: string;

  @Field()
  username: string;

  @Field()
  password: string;
}
