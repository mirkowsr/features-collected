import { FileValidator, Injectable } from '@nestjs/common'

type FileSizeValidationPipeOptions = { maxSize: number }

@Injectable()
export class FileSizeValidationPipe extends FileValidator<FileSizeValidationPipeOptions> {
  constructor(options: FileSizeValidationPipeOptions) {
    super(options)
  }

  isValid(file: Express.Multer.File): boolean | Promise<boolean> {
    return file.size < this.validationOptions.maxSize
  }

  buildErrorMessage(): string {
    return `File size exceeds max of ${this.validationOptions.maxSize} bytes`
  }
}
