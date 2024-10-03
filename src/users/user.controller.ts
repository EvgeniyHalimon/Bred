// nest
import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Patch,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

// service
import { UsersService } from './user.service';

// dto
import { GetAllUserPresenter, PatchUserDto, UserPresenter } from './dto';

// validation
import { fileValidationPipe } from './file-validation.pipe';

// types
import { ICustomRequest, vocabulary } from 'src/shared';

const {
  users: { USER_NOT_FOUND, EMAIL_IS_TAKEN },
} = vocabulary;

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  /* MADE RESPONSES */
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Represents array of users',
    type: GetAllUserPresenter,
  })
  @Get('/')
  findAll(): Promise<GetAllUserPresenter> {
    return this.usersService.findAll();
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User successfully deleted reaction',
    type: UserPresenter,
  })
  @ApiNotFoundResponse({
    example: {
      message: USER_NOT_FOUND,
      error: 'Not Found',
      statusCode: HttpStatus.NOT_FOUND,
    },
    description: 'When user is not presented in database',
  })
  @ApiBadRequestResponse({
    description: 'When email is taken when you truing to update yours',
    example: {
      message: EMAIL_IS_TAKEN,
      error: 'Bad Request',
      statusCode: HttpStatus.BAD_REQUEST,
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  @Patch('/')
  patch(
    @Body() updateUserDto: PatchUserDto,
    @UploadedFile(fileValidationPipe)
    file: Express.Multer.File,
    @Req() req: ICustomRequest,
  ): Promise<UserPresenter> {
    let photo;
    if (file) {
      const base64 = file?.buffer?.toString('base64');
      photo = `data:${file.mimetype};base64,${base64}`;
    }
    return this.usersService.patch({
      updateUserDto,
      file: photo,
      userId: req.user.id,
    });
  }
}
