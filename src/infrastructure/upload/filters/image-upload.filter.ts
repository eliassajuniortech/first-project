import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from "@nestjs/common";
import { Response } from "express";
import { ImageUploadError } from "../errors/image-upload.error";

@Catch(ImageUploadError)
export class ImageUploadFilter implements ExceptionFilter {
  public catch(exception: ImageUploadError, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();

    return response.status(HttpStatus.BAD_REQUEST).json({
      errorCode: "IMAGE_UPLOAD_FAILED",
      message: exception.message,
    });
  }
}
