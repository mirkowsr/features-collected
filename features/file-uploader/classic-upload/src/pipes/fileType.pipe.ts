import { FileValidator, Injectable } from '@nestjs/common'

type FileTypeValidationPipeOptions = { allowedMimeTypes: string[] }

@Injectable()
export class FileTypeValidationPipe extends FileValidator<FileTypeValidationPipeOptions> {
  constructor(options: FileTypeValidationPipeOptions) {
    super(options)
  }

  isValid(file: Express.Multer.File): boolean | Promise<boolean> {
    return this.validationOptions.allowedMimeTypes.includes(file.mimetype)
  }
  buildErrorMessage(): string {
    return `File type not allowed. Accepted: ${this.validationOptions.allowedMimeTypes.join(', ')}`
  }
}
