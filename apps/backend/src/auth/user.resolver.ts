import {
  Resolver,
  Query,
  Args,
  Mutation,
  Context,
  Field,
  GqlExecutionContext,
} from "@nestjs/graphql";
import { AuthService, ITokenPayload } from "./auth.service";
import { User } from "./user.entity";
import { RegisterInput } from "./dto/auth.dto";
import {
  createParamDecorator,
  ExecutionContext,
  Inject,
  Res,
  UnauthorizedException,
  UseGuards,
} from "@nestjs/common";
import { RefreshTokenResponse } from "./dto/refresh-token.response";
import { Response } from "express";
import { JwtAdminOnlyAuthGuard, JwtAuthGuard } from "./jwt-auth.guard";
import { UserUpdateInputDTO } from "./dto/user-update-input.dto";
import { UserService } from "./user.service";
import { ConfigService } from "@nestjs/config";

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Mutation(() => User)
  async updateUser(
    @Context("req") req: any,
    @Args("userUpdateInput") userUpdateInput: UserUpdateInputDTO
  ): Promise<User> {
    const { sub } = req.user as ITokenPayload;
    return this.userService.update(sub, userUpdateInput);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Boolean)
  async changeUserRoleToAdmin(
    @Args("secretKey") secretKey: string,
    @Context("req") req: any
  ): Promise<boolean> {
    const { sub } = req.user as ITokenPayload;
    return this.userService.changeUserRoleToAdmin(sub, secretKey);
  }
}
