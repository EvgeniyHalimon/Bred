// nest
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpStatus,
  MaxFileSizeValidator,
  ParseFilePipe,
  Patch,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

// service
import { UsersService } from './user.service';

// dto
import { GetAllUsersResponseDto } from './dto';
import { ICustomRequest } from 'src/shared';
import { CustomFileTypeValidator } from './file.validator';

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

  @UseInterceptors(FileInterceptor('file'))
  @Patch('/')
  patch(
    @Body() updateUserDto: any,
    @UploadedFile(
      new ParseFilePipe({
        fileIsRequired: false,
        validators: [
          new MaxFileSizeValidator({
            maxSize: 1 * 1024 * 1024,
            message: size => `File should be ${size / 1024 / 1024}mb or less`,
          }),
          new CustomFileTypeValidator({
            fileType: /\.(jpg|jpeg|png|webp)$/,
            message: 'Only jpg, jpeg, png, webp files are allowed',
          }),
        ],
        exceptionFactory: error => {
          throw new BadRequestException(error);
        },
      }),
    )
    file: Express.Multer.File,
    @Req() req: ICustomRequest,
  ) {
    console.log(
      '🚀 ~ file: user.controller.ts:59 ~ UsersController ~ req:',
      req,
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
