// nest
import {
  ParseFilePipe,
  MaxFileSizeValidator,
  BadRequestException,
} from '@nestjs/common';

// validator
import { CustomFileTypeValidator } from './file.validator';

export const fileValidationPipe = new ParseFilePipe({
  fileIsRequired: false,
  validators: [
    new MaxFileSizeValidator({
      maxSize: 0.5 * 1024 * 1024,
      message: size => `File should be ${size / 1024 / 1024}mb or less`,
    }),
    new CustomFileTypeValidator({
      fileType: /^(image\/jpg|image\/jpeg|image\/png|image\/webp)$/,
      message: 'Only jpg, jpeg, png, webp files are allowed',
    }),
  ],
  exceptionFactory: error => {
    throw new BadRequestException(error);
  },
});
