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
import { GetAllUserPresenter, PatchUserDto, UserPresenter } from './dto';

// util
import { hashPassword } from 'src/auth/utils/passwordUtils';

// types
import { IUser, UpdateUserWithFile } from './user.types';

// constants
import { vocabulary } from 'src/shared';

const {
  users: { USER_NOT_FOUND, EMAIL_IS_TAKEN },
} = vocabulary;

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) readonly userModel: typeof User) {}

  async findAll(): Promise<GetAllUserPresenter> {
    const users = await this.userModel.findAndCountAll();

    return new GetAllUserPresenter(users.rows, users.count);
  }

  async patch({
    updateUserDto,
    file,
    userId,
  }: {
    updateUserDto: Partial<PatchUserDto>;
    file: string | undefined;
    userId: string;
  }): Promise<UserPresenter> {
    const user = await this.findOne({ id: userId });

    if (!user) {
      throw new NotFoundException(USER_NOT_FOUND);
    }

    if (updateUserDto.email) {
      const searchedUser = await this.findOne({ email: updateUserDto.email });
      if (searchedUser) {
        throw new BadRequestException(EMAIL_IS_TAKEN);
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

  findOne(whereCondition: Partial<IUser>): Promise<User | null> {
    return this.userModel.findOne({ where: whereCondition });
  }
}
