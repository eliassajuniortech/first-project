export class ImageUploadError extends Error {
  constructor(message = "Falha ao enviar a imagem.") {
    super(message);
    this.name = "ImageUploadError";
  }
}
