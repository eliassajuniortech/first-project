import { Injectable } from "@nestjs/common";
import { HashingRepository } from "../../../../infrastructure/security/hashing/hashing.repository";
import { UserRepository } from "../../../user/domain/repositories/user.repository";
import { JwtRepository } from "../../domain/repositories/jwt.repository";
import { InvalidCredentialsError } from "../errors/invalid-credentials.error";
import { Login } from "../types/login.type";
import { Tokens } from "../types/tokens.type";

@Injectable()
export class LoginService {
  private readonly userRepository: UserRepository;
  private readonly jwtRepository: JwtRepository;
  private readonly hashingRepository: HashingRepository;

  constructor(jwtRepository: JwtRepository, userRepository: UserRepository, hashingRepository: HashingRepository) {
    this.jwtRepository = jwtRepository;
    this.userRepository = userRepository;
    this.hashingRepository = hashingRepository;
  }

  public async execute(input: Login): Promise<Tokens> {
    const user = await this.userRepository.findUserByEmail(input.email);
    if (!user) {
      throw new InvalidCredentialsError();
    }

    const isValidPassword = await this.hashingRepository.verify(user.getPassword(), input.password);
    if (!isValidPassword) {
      throw new InvalidCredentialsError();
    }

    const accessToken = await this.jwtRepository.generateAccessToken({ sub: user.getId(), email: input.email });
    const refreshToken = await this.jwtRepository.generateRefreshToken({ sub: user.getId(), email: input.email });

    return { accessToken: accessToken, refreshToken: refreshToken };
  }
}
