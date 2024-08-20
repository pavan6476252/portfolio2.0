import { Controller, Get, Req, Res, UseGuards, Query } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import { User } from "./user.entity";

declare module "express-session" {
  interface Session {
    returnBackUrl?: string;
  }
}

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get("google")
  @UseGuards(AuthGuard("google"))
  async googleAuth(
    @Req() req: Request,
    @Query("return") returnBackUrl: string
  ) {
    req.session.returnBackUrl = returnBackUrl;
  }

  @Get("google/callback")
  @UseGuards(AuthGuard("google"))
  async googleAuthRedirect(@Req() req: Request, @Res() res: Response) {
    const user = req.user as User;
    const tokens = await this.authService.login(user);

    res.cookie("refresh_token", tokens.refresh_token, {
      httpOnly: true,
      sameSite: process.env.MODE == "development" ? "lax" : "none",
      secure: process.env.MODE == "development" ? false : true,
    });

    const frontendUrl = process.env.FRONTEND_BASE_URL + "/auth";
    // const frontendUrl = "http://localhost:5000";
    const returnBackUrl = req.session.returnBackUrl || "/";
    const redirectUrl = `${frontendUrl}?access_token=${tokens.access_token}&return=${returnBackUrl}`;

    delete req.session.returnBackUrl;

    res.redirect(redirectUrl);
  }
}
