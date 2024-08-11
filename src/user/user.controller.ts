// nest
import { Controller, Get, Post, Body } from '@nestjs/common';

// service
import { UsersService } from './user.service';

// schema
import { User } from './user.schema';

// decorator
import { Public } from 'src/shared/public.decorator';

// dto
import { CreateUserDto } from './dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const createdUser = this.usersService.create(createUserDto);
    return { data: { createdUser }, message: 'User created successfully' };
  }

  @Public()
  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }
}
