import { Transform } from "class-transformer";
import { IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, IsString, IsStrongPassword, Matches, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {
  @IsString({ message: "O primeiro nome deve ser uma string." })
  @IsNotEmpty({ message: "O primeiro nome é obrigatório." })
  @Matches(/^[\p{L}\s]+$/u, { message: "O primeiro nome deve conter apenas letras e espaços." })
  @MinLength(3, { message: "O primeiro nome deve ter pelo menos 3 caracteres." })
  @MaxLength(50, { message: "O primeiro nome não deve exceder 50 caracteres." })
  @Transform(({ value }) => value.trim())
  firstName: string;

  @IsString({ message: "O sobrenome deve ser uma string." })
  @IsNotEmpty({ message: "O sobrenome é obrigatório." })
  @Matches(/^[\p{L}\s]+$/u, { message: "O sobrenome deve conter apenas letras e espaços." })
  @MinLength(3, { message: "O sobrenome deve ter pelo menos 3 caracteres." })
  @MaxLength(50, { message: "O sobrenome não deve exceder 50 caracteres." })
  @Transform(({ value }) => value.trim())
  lastName: string;

  @IsEmail({ allow_ip_domain: false, allow_utf8_local_part: false, require_tld: true, allow_underscores: true }, { message: "Informe um endereço de e-mail válido." })
  @IsNotEmpty({ message: "O endereço de e-mail é obrigatório." })
  email: string;

  @IsString({ message: "A senha deve ser uma string." })
  @IsNotEmpty({ message: "A senha é obrigatória." })
  @MinLength(8, { message: "A senha deve ter pelo menos 8 caracteres." })
  @MaxLength(64, { message: "A senha não deve exceder 64 caracteres." })
  @IsStrongPassword({ minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 }, { message: "A senha deve conter pelo menos uma letra minúscula, uma letra maiúscula, um número e um símbolo." })
  @Matches(/^[a-zA-Z0-9!@.$\s]+$/, { message: "A senha contém caracteres inválidos." })
  password: string;

  @IsOptional()
  @IsPhoneNumber("BR", { message: "Informe um número de telefone brasileiro válido." })
  @Transform(({ value }) => value?.trim())
  phone?: string;
}
