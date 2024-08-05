import { Controller, Get, Post, Body } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './user.service';
import { User } from './schema/user.schema';
import { Public } from 'src/shared/public.decorator';

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
