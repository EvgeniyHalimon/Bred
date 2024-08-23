// nest
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

// schema
import User from './user.schema';

// dto
import { UpdateUserDto } from './dto';
import { hashPassword } from 'src/auth/utils/passwordUtils';
import { IUser } from './user.types';

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
    userId,
  }: {
    updateUserDto: UpdateUserDto;
    file: string | undefined;
    userId: string;
  }) {
    const user = await this.findOne({ id: userId });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    if (updateUserDto.email) {
      const searchedUser = await this.findOne({ email: updateUserDto.email });
      if (searchedUser) {
        throw new BadRequestException('This email is taken');
      }
    }

    if (updateUserDto.password) {
      updateUserDto.password = await hashPassword(updateUserDto.password);
    }

    user.set({
      ...updateUserDto,
      photo: file,
    });

    const updatedUser = await user.save();

    return updatedUser;
  }

  findOne(user: Partial<IUser>) {
    return this.userModel.findOne({ where: user });
  }
}
