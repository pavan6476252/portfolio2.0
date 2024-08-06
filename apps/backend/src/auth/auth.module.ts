import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { GoogleStrategy } from "./google.strategy";
import { UserService } from "./user.service";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { AuthResolver } from "./auth.resolver";
import { PassportModule } from "@nestjs/passport";
import { ConfigModule } from "@nestjs/config";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { JwtStrategy } from "./jwt.stratergy";
import { JwtAuthGuard } from "./jwt-auth.guard";

@Module({
  imports: [
    ConfigModule,
    PassportModule.register({ defaultStrategy: "jwt" }),
    JwtModule.register({
      global: true,
      secret: "your-jwt-secret",
      signOptions: { expiresIn: "1d" },
    }),
    TypeOrmModule.forFeature([User,]),
    // TypeOrmModule.forFeature([BlogPost, Comment, Tag])
  ],
  providers: [JwtAuthGuard,AuthService, UserService, GoogleStrategy, AuthResolver,JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService,JwtAuthGuard],
})
export class AuthModule {}
