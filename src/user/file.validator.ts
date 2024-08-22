// nest
import { FileValidator } from '@nestjs/common';
import { IFile } from '@nestjs/common/pipes/file/interfaces';

// types
import { CustomFileTypeValidatorOptions } from './user.types';

export class CustomFileTypeValidator extends FileValidator<
  CustomFileTypeValidatorOptions,
  IFile
> {
  isValid(file?: IFile): boolean {
    if (!file) return false;

    const regex = new RegExp(this.validationOptions.fileType);
    return regex.test(file.mimetype);
  }

  buildErrorMessage(): string {
    return (
      this.validationOptions.message ??
      `Invalid file type. Allowed type: ${this.validationOptions.fileType}`
    );
  }
}
