// nest
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

// schema
import User from './user.schema';

// dto
import { GetAllUsersResponseDto, PatchUserDto } from './dto';

// util
import { hashPassword } from 'src/auth/utils/passwordUtils';

// types
import { IUser, UpdateUserWithFile } from './user.types';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userModel: typeof User) {}

  async findAll(): Promise<GetAllUsersResponseDto> {
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
    updateUserDto: Partial<PatchUserDto>;
    file: string | undefined;
    userId: string;
  }): Promise<PatchUserDto> {
    const user = await this.findOne({ id: userId });

    if (!user) {
      throw new NotFoundException('User not found');
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

    const updateObject = {
      ...updateUserDto,
    } as UpdateUserWithFile;

    if (file) {
      updateObject.photo = file;
    }

    user.set(updateObject);

    const updatedUser = await user.save();

    return updatedUser;
  }

  findOne(user: Partial<IUser>): Promise<User | null> {
    return this.userModel.findOne({ where: user });
  }
}
