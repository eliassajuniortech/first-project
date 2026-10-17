export class UserAlreadyExistsError extends Error {
  constructor(message = "Este endereço de e-mail já está em uso.") {
    super(message);
    this.name = "UserAlreadyExistsError";
  }
}
