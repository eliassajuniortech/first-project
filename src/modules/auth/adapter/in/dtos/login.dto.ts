import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class LoginDto {
  @IsEmail({ allow_ip_domain: false, allow_utf8_local_part: false, require_tld: true, allow_underscores: true }, { message: "Please provide a valid email address." })
  @IsNotEmpty({ message: "The email address is required." })
  email: string;

  @IsString({ message: "The first name must be a string." })
  @IsNotEmpty({ message: "The first name is required." })
  password: string;
}
