// nest
import { Controller, Get } from '@nestjs/common';

// service
import { UsersService } from './user.service';

// decorator
import { Public } from 'src/shared/public.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Get()
  async findAll() {
    return this.usersService.findAll();
  }
}
