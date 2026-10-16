import { Payload } from "./types/payload.type";

export abstract class JwtRepository {
  public abstract generateAccessToken(payload: Payload): Promise<string>;
  public abstract generateRefreshToken(payload: Payload): Promise<string>;
}
