import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { ConfigService } from "@nestjs/config";
import { ITokenPayload } from "./auth.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      secretOrKey: "your-jwt-secret",
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      // secretOrKey: configService.get<string>("JWT_SECRET"),
    });
  }

  async validate(payload: ITokenPayload) {
    return {
      sub: payload.sub,
      username: payload.username,
      role: payload.role,
    };
  }
}
