export class InvalidCredentialsError extends Error {
  constructor(message = "Invalid e-mail or password.") {
    super(message);
    this.name = "InvalidCredentialsError";
  }
}
