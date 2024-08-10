import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-google-oauth20";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { AuthService } from "./auth.service";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, "google") {
  constructor(
    private readonly authService: AuthService,
    private configService: ConfigService
  ) {
    super({
      clientID: configService.get<string>("GOOGLE_CLIENT_ID"),
      clientSecret: configService.get<string>("GOOGLE_CLIENT_SECRET"),
      callbackURL: configService.get<string>("GOOGLE_CALLBACK_URL"),
      scope: ["email", "profile"],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: Function
  ) {
    try {
      const user = await this.authService.validateUserByGoogleId(profile.id);
      if (!user) {
        const newUser = await this.authService.register({
          googleId: profile.id,
          email: profile.emails[0].value,
          username: profile.displayName,
          role: "user",
          picture: profile.photos[0].value,
        });
        return done(null, newUser);
      }
      return done(null, user);
    } catch (err) {
      return done(err, false);
    }
  }
}
