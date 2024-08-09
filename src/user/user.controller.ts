// nest
import { Controller, Get, Post, Body } from '@nestjs/common';

// service
import { UsersService } from './user.service';

// schema
import { User } from './schema/user.schema';

// decorator
import { Public } from 'src/shared/public.decorator';

// dto
import { CreateUserDto } from './dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Post()
  async create(@Body() createCatDto: CreateUserDto) {
    return this.usersService.create(createCatDto);
  }

  @Public()
  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }
}
