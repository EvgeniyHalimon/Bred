// nest
import { Controller, Get, HttpStatus } from '@nestjs/common';
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
  @Get()
  async findAll() {
    return this.usersService.findAll();
  }
}
