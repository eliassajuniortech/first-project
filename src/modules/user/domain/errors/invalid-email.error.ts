export class InvalidEmailError extends Error {
  constructor(message = "O endereço de e-mail informado é inválido.") {
    super(message);
    this.name = "InvalidEmailError";
  }
}
