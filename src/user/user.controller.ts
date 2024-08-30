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
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

// service
import { UsersService } from './user.service';

// dto
import { GetAllUsersResponseDto, PatchUserDto } from './dto';
import { ICustomRequest } from 'src/shared';
import { fileValidationPipe } from './file-validation.pipe';

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
    @Body() updateUserDto: PatchUserDto,
    @UploadedFile(fileValidationPipe)
    file: Express.Multer.File,
    @Req() req: ICustomRequest,
  ) {
    const userId = req.user.id;
    const photo = file?.buffer?.toString('base64url');
    return this.usersService.patch({
      updateUserDto,
      file: photo,
      userId,
    });
  }
}
