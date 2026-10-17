import { Body, Controller, Post, Res, UseGuards } from "@nestjs/common";
import type { Response } from "express";
import { LoginService } from "../../application/services/login.service";
import { JwtRepository } from "../../domain/repositories/jwt.repository";
import { AccessTokenGuard } from "../../infrastructure/guard/access-token.guard";
import { RefreshTokenGuard } from "../../infrastructure/guard/refresh-token.guard";
import { LoginDto } from "./dtos/login.dto";

@Controller("auth")
export class AuthController {
  private readonly loginService: LoginService;
  private readonly jwtRepository: JwtRepository;

  constructor(loginService: LoginService, jwtRepository: JwtRepository) {
    this.loginService = loginService;
    this.jwtRepository = jwtRepository;
  }

  @Post("login")
  public async login(@Body() body: LoginDto, @Res({ passthrough: true }) response: Response): Promise<{ message: string }> {
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
  public async logout(@Res({ passthrough: true }) response: Response): Promise<{ message: string }> {
    response.clearCookie("access_token");
    response.clearCookie("refresh_token");

    return { message: "Logout completed successfully." };
  }

  @Post("refresh_token")
  @UseGuards(RefreshTokenGuard)
  public async refreshToken(@Res({ passthrough: true }) response: Response): Promise<void> {
    const accessToken = await this.jwtRepository.generateAccessToken({ sub: "", email: "" });

    response.cookie("access_token", accessToken, {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
      maxAge: 60 * 60 * 1000,
    });
  }
}
