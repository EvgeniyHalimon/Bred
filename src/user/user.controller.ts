// nest
import {
  Body,
  Controller,
  FileTypeValidator,
  Get,
  HttpStatus,
  MaxFileSizeValidator,
  ParseFilePipe,
  Patch,
  UploadedFile,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

// service
import { UsersService } from './user.service';

// dto
import { GetAllUsersResponseDto } from './dto';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Represents array of users',
    type: GetAllUsersResponseDto,
  })
  @Get('/')
  findAll() {
    return this.usersService.findAll();
  }

  @Patch('/')
  patch(
    @Body() updateUserDto: any,
    @UploadedFile(
      new ParseFilePipe({
        fileIsRequired: false,
        validators: [
          new MaxFileSizeValidator({ maxSize: 2 * 1024 * 1024 }),
          new FileTypeValidator({ fileType: /\.(jpg|jpeg|png|webp)$/ }),
        ],
        exceptionFactory: errors => {
          console.log(
            '🚀 ~ file: user.controller.ts:47 ~ UsersController ~ errors:',
            errors,
          );
        },
      }),
    )
    file: Express.Multer.File,
  ) {
    const photo = file.buffer.toString();
    console.log(
      '🚀 ~ file: user.controller.ts:51 ~ UsersController ~ photo:',
      photo,
    );
    console.log(
      '🚀 ~ file: user.controller.ts:38 ~ UsersController ~ file:',
      file,
    );
    console.log(
      '🚀 ~ file: user.controller.ts:38 ~ UsersController ~ updateUserDto:',
      updateUserDto,
    );
  }
}
