import { Body, Controller, Post, Res, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import type { Response } from "express";
import { JwtRepository } from "../../auth/domain/repositories/jwt.repository";
import { RegisterUserService } from "../application/services/register-user.service";
import { CreateUserDto } from "./dtos/create-user.dto";
import { Message } from "./types/message.type";

@Controller("user")
export class UserController {
  private readonly registerUserService: RegisterUserService;
  private readonly jwtRepository: JwtRepository;

  constructor(registerUserService: RegisterUserService, jwtRepository: JwtRepository) {
    this.registerUserService = registerUserService;
    this.jwtRepository = jwtRepository;
  }

  @Post()
  @UseInterceptors(FileInterceptor("file"))
  public async registerUser(@Body() body: CreateUserDto, @Res({ passthrough: true }) response: Response, @UploadedFile() file?: Express.Multer.File): Promise<Message> {
    const user = await this.registerUserService.execute(body, file);

    const accessToken = await this.jwtRepository.generateAccessToken({ sub: user.getId(), email: user.getEmail().getValue() });
    const refreshToken = await this.jwtRepository.generateRefreshToken({ sub: user.getId(), email: user.getEmail().getValue() });

    response.cookie("access_token", accessToken, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      secure: false,
      maxAge: 60 * 60 * 1000,
    });
    response.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      sameSite: "lax",
      path: "auth/refresh_token",
      secure: false,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return { message: "Registration completed successfully." };
  }
}
