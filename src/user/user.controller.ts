// nest
import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

// service
import { UsersService } from './user.service';

// decorator
import { Public } from 'src/shared/public.decorator';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Get()
  async findAll() {
    return this.usersService.findAll();
  }
}
