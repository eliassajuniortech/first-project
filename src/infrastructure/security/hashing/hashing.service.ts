import { Injectable } from "@nestjs/common";
import argon2 from "argon2";
import { HashingRepository } from "./hashing.repository";

@Injectable()
export class HashingService implements HashingRepository {
  public async hash(password: string): Promise<string> {
    return await argon2.hash(password, {
      type: argon2.argon2id,
    });
  }

  public async verify(hash: string, password: string): Promise<boolean> {
    return await argon2.verify(hash, password);
  }
}
