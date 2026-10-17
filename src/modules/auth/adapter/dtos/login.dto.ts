import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class LoginDto {
  @IsEmail({ allow_ip_domain: false, allow_utf8_local_part: false, require_tld: true, allow_underscores: true }, { message: "Informe um endereço de e-mail válido." })
  @IsNotEmpty({ message: "O endereço de e-mail é obrigatório." })
  email: string;

  @IsString({ message: "A senha deve ser uma string." })
  @IsNotEmpty({ message: "A senha é obrigatória." })
  password: string;
}
