export class ImageUploadError extends Error {
  constructor(message = "Failed to upload the image.") {
    super(message);
    this.name = "ImageUploadError";
  }
}
