import { Controller, Get, Post, Body, UsePipes } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './user.service';
import { ZodValidationPipe } from 'src/helpers/ZodValidationPipe';
import { createCatSchema } from './validation/createCatSchema';
import { User } from 'src/schemas/user.schema';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UsePipes(new ZodValidationPipe(createCatSchema))
  @Post()
  async create(@Body() createCatDto: CreateUserDto) {
    return this.usersService.create(createCatDto);
  }

  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }
}
