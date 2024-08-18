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
  Res,
  UnauthorizedException,
  UseGuards,
} from "@nestjs/common";
import { RefreshTokenResponse } from "./dto/refresh-token.response";
import { Response } from "express";
import { JwtAdminOnlyAuthGuard, JwtAuthGuard } from "./jwt-auth.guard";

@Resolver(() => User)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Query(() => User)
  @UseGuards(JwtAuthGuard)
  async getProfile(@Context("req") req: any): Promise<User> {
    const user = req.user as ITokenPayload;
    const fullUserProfile = await this.authService.getProfile(user.sub);
    console.log(fullUserProfile);
    if (!fullUserProfile) {
      throw new Error("User profile not found");
    }
    return fullUserProfile;
  }

  @Mutation(() => User)
  async login(
    @Args("email") email: string,
    @Args("password") password: string
  ): Promise<{ access_token: string; refresh_token: string }> {
    const user = await this.authService.validateUserByEmail(email);
    if (!user || user.password !== password) {
      throw new Error("Invalid credentials");
    }
    return this.authService.login(user);
  }

  @Mutation(() => User)
  async register(
    @Args("registerInput") registerInput: RegisterInput
  ): Promise<User> {
    return this.authService.register(registerInput);
  }

  @Mutation(() => RefreshTokenResponse)
  async refreshTokens(
    @Context("req") req: any,
    @Context("res") res: Response
  ): Promise<RefreshTokenResponse> {
    console.log(req.cookies);
    const refreshToken = req.cookies?.refresh_token;
    if (!refreshToken) {
      throw new UnauthorizedException("Refresh token is missing");
    }

    try {
      return await this.authService.refreshTokens(refreshToken);
    } catch (error) {
      console.log(error);
      res.clearCookie("refresh_token", {
        httpOnly: true,
        sameSite: process.env.NODE_ENV === "development" ? "lax" : "none",
        secure: process.env.NODE_ENV !== "development",
        expires: new Date(0),
      });
      throw new UnauthorizedException("Refresh token is expired or invalid");
    }
  }
  @Mutation(() => Boolean)
  async logout(
    @Context("req") req: any,
    @Context("res") res: Response
  ): Promise<boolean> {
    const refreshToken = req.cookies?.refresh_token;
    if (!refreshToken) {
      throw new UnauthorizedException("Refresh token is missing");
    }

    res.clearCookie("refresh_token", {
      httpOnly: true,
      sameSite: process.env.NODE_ENV === "development" ? "lax" : "none",
      secure: process.env.NODE_ENV !== "development",
      expires: new Date(0),
    });

    return true;
  }
}
