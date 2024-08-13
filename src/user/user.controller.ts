// nest
import { Controller, Get } from '@nestjs/common';

// service
import { UsersService } from './user.service';

// schema
import User from './user.schema';

// decorator
import { Public } from 'src/shared/public.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }
}
