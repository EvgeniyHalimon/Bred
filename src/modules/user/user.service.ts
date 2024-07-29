import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/schemas/user.schema';
import { IUser } from './interfaces/user.interfaces';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userModel: typeof User) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const userAttributes: IUser = {
      firstName: createUserDto.firstName,
      lastName: createUserDto.lastName,
      isActive: createUserDto.isActive,
    };
    const createdUser = this.userModel.create(userAttributes);
    return createdUser;
  }

  async findAll(): Promise<User[]> {
    return this.userModel.findAll();
  }
}
