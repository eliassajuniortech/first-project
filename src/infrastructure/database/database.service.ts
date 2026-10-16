import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class DatabaseService extends PrismaClient {
  constructor(config: ConfigService) {
    const adatper = new PrismaPg({ connectionString: config.get<string>("DATABASE_URL") });
    super({ adapter: adatper });
  }
}
