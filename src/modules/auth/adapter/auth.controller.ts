import { Body, Controller, Post, Res, UseGuards } from "@nestjs/common";
import { Throttle } from "@nestjs/throttler";
import type { Response } from "express";
import { LoginService } from "../application/services/login.service";
import { JwtRepository } from "../domain/repositories/jwt.repository";
import { CurrentUser } from "../infrastructure/decorators/current-user.decorator";
import { AccessTokenGuard } from "../infrastructure/guards/access-token.guard";
import { RefreshTokenGuard } from "../infrastructure/guards/refresh-token.guard";
import type { AuthenticatedUser } from "../infrastructure/types/authenticated-user.type";
import { LoginDto } from "./dtos/login.dto";
import { Message } from "./types/message.type";

@Controller("auth")
export class AuthController {
  private readonly loginService: LoginService;
  private readonly jwtRepository: JwtRepository;

  constructor(loginService: LoginService, jwtRepository: JwtRepository) {
    this.loginService = loginService;
    this.jwtRepository = jwtRepository;
  }

  @Post("login")
  @Throttle({ default: { limit: 5, ttl: 60_000 } })
  public async login(@Body() body: LoginDto, @Res({ passthrough: true }) response: Response): Promise<Message> {
    const { accessToken, refreshToken } = await this.loginService.execute(body);

    response.cookie("access_token", accessToken, {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
      maxAge: 60 * 60 * 1000,
    });
    response.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return { message: "Login completed successfully." };
  }

  @Post("logout")
  @UseGuards(AccessTokenGuard)
  @Throttle({ default: { limit: 5, ttl: 60_000 } })
  public async logout(@Res({ passthrough: true }) response: Response): Promise<Message> {
    response.clearCookie("access_token");
    response.clearCookie("refresh_token");

    return { message: "Logout completed successfully." };
  }

  @Post("refresh_token")
  @UseGuards(RefreshTokenGuard)
  @Throttle({ default: { limit: 5, ttl: 60_000 } })
  public async refreshToken(@Res({ passthrough: true }) response: Response, @CurrentUser() user: AuthenticatedUser): Promise<void> {
    const accessToken = await this.jwtRepository.generateAccessToken({ sub: user.id, email: user.email });

    response.cookie("access_token", accessToken, {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
      maxAge: 60 * 60 * 1000,
    });
  }
}
