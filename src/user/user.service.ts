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

  async patch({
    updateUserDto,
    file,
  }: {
    updateUserDto: any;
    file: Express.Multer.File;
  }) {
    console.log('🚀 ~ file: user.service.ts:28 ~ UsersService ~ file:', file);
    console.log(
      '🚀 ~ file: user.service.ts:22 ~ UsersService ~ updateUserDto:',
      updateUserDto,
    );
  }
}
