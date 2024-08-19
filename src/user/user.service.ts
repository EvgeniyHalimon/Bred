// nest
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

// schema
import User from './user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userModel: typeof User) {}

  async findAll() {
    const users = await this.userModel.findAndCountAll();

    return {
      users: users.rows,
      count: users.count,
    };
  }
}
