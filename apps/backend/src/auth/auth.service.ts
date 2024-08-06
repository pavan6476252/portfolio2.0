import { Injectable } from "@nestjs/common";
import { UserService } from "./user.service";
import { User } from "./user.entity";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  async getProfile(userId: number): Promise<User> {
    return await this.userService.findByID(userId);
  }

  async validateUserByGoogleId(googleId: string): Promise<User | undefined> {
    return this.userService.findOneByGoogleId(googleId);
  }

  async validateUserByEmail(email: string): Promise<User | undefined> {
    return this.userService.findOneByEmail(email);
  }

  async register(user: Partial<User>): Promise<User> {
    return this.userService.create(user);
  }

  async login(user: User) {
    const payload: ITokenPayload = {
      username: user.username,
      sub: user.id,
      role: user.role,
    };
    return {
      access_token: await this.jwtService.signAsync(payload, {
        expiresIn: "1d",
        secret: "your-jwt-secret",
      }),
      refresh_token: await this.jwtService.signAsync(payload, {
        expiresIn: "1d",
        secret: "your-jwt-secret",
      }),
    };
  }

  async refreshTokens(refreshToken: string) {
    const payload = await this.jwtService.verifyAsync<ITokenPayload>(
      refreshToken,
      {
        secret: "your-jwt-secret",
      }
    );
    return {
      access_token: await this.jwtService.signAsync(
        {
          username: payload.username,
          sub: payload.sub,
          role: payload.role,
        },
        { expiresIn: "1d", secret: "your-jwt-secret" }
      ),
      // refresh_token: this.jwtService.sign(payload, { expiresIn: "1d" }),
    };
  }
}

export interface ITokenPayload {
  username: string;
  sub: number;
  role: string;
}
