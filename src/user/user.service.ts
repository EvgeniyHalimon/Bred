// nest
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

// schema
import User from './user.schema';

// dto
import { UpdateUserDto } from './dto';

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
    console.log('🚀 ~ file: user.service.ts:33 ~ UsersService ~ file:', file);
    const user = await this.findOne({ userId });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    user.set({ ...updateUserDto, photo: file });

    const updatedArticle = await user.save();

    return updatedArticle;
  }

  findOne({ userId }: { userId: string }) {
    return this.userModel.findOne({ where: { id: userId } });
  }
}
