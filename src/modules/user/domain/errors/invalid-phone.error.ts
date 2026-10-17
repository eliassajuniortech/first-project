export class InvalidPhoneError extends Error {
  constructor(message = "O número de telefone informado é inválido.") {
    super(message);
    this.name = "InvalidPhoneError";
  }
}
