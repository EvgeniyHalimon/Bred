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
import { GetAllUsersResponseDto, UpdateUserDto } from './dto';
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
    @Body() updateUserDto: UpdateUserDto,
    @UploadedFile(
      new ParseFilePipe({
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
      }),
    )
    file: Express.Multer.File,
    @Req() req: ICustomRequest,
  ) {
    const userId = req.user.id;
    const photo = file && file.buffer.toString('base64url');
    return this.usersService.patch({
      updateUserDto,
      file: photo,
      userId,
    });
  }
}
