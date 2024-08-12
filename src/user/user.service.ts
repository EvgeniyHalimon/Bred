// nest
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

// schema
import User from './user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userModel: typeof User) {}

  async findAll(): Promise<User[]> {
    return this.userModel.findAll();
  }
}
