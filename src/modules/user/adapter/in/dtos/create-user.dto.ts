import { Transform } from "class-transformer";
import { IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, IsString, IsStrongPassword, Matches, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {
  @IsString({ message: "The first name must be a string." })
  @IsNotEmpty({ message: "The first name is required." })
  @Matches(/^[\p{L}\s]+$/u, { message: "The first name must contain only letters and spaces." })
  @MinLength(3, { message: "The first name must be at least 3 characters long." })
  @MaxLength(50, { message: "The first name must not exceed 50 characters." })
  @Transform(({ value }) => value.trim())
  readonly firstName: string;

  @IsString({ message: "The last name must be a string." })
  @IsNotEmpty({ message: "The last name is required." })
  @Matches(/^[\p{L}\s]+$/u, { message: "The last name must contain only letters and spaces." })
  @MinLength(3, { message: "The last name must be at least 3 characters long." })
  @MaxLength(50, { message: "The last name must not exceed 50 characters." })
  @Transform(({ value }) => value.trim())
  readonly lastName: string;

  @IsEmail({ allow_ip_domain: false, allow_utf8_local_part: false, require_tld: true, allow_underscores: true }, { message: "Please provide a valid email address." })
  @IsNotEmpty({ message: "The email address is required." })
  readonly email: string;

  @IsString({ message: "The password must be a string." })
  @IsNotEmpty({ message: "The password is required." })
  @MinLength(8, { message: "The password must be at least 8 characters long." })
  @MaxLength(64, { message: "The password must not exceed 64 characters." })
  @IsStrongPassword(
    { minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 },
    { message: "The password must contain at least one lowercase letter, one uppercase letter, one number, and one symbol." },
  )
  @Matches(/^[a-zA-Z0-9!@.$\s]+$/, { message: "The password contains invalid characters. Use only letters, numbers, spaces, and the following symbols: ! @ . $" })
  readonly password: string;

  @IsOptional()
  @IsPhoneNumber("BR", { message: "Please provide a valid Brazilian phone number." })
  @Transform(({ value }) => value?.trim())
  readonly phone?: string;
}
