// nest
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

// schema
import { User } from './user.schema';

// dto's
import { CreateUserDto, SignInDto } from './dto';

// types
import { IUser } from './user.types';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userModel: typeof User) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const user = await this.userModel.findOne({
        where: { email: createUserDto.email },
      });
      if (user) {
        throw new BadRequestException('User already exists');
      }

      const createdUser = await this.userModel.create(createUserDto);
      return createdUser;
    } catch (err) {
      console.log(
        '🚀 ~ file: user.service.ts:34 ~ UsersService ~ create ~ err:',
        err,
      );
      throw err;
    }
  }

  async signIn(signInDto: SignInDto): Promise<IUser | null> {
    try {
      const user = await this.userModel.findOne({
        where: { email: signInDto.email },
      });
      if (!user) {
        throw new NotFoundException('User not found');
      }
      return user.dataValues;
    } catch (err) {
      console.log(
        '🚀 ~ file: user.service.ts:49 ~ UsersService ~ signIn ~ err:',
        err,
      );
      throw err;
    }
  }

  async findAll(): Promise<User[]> {
    return this.userModel.findAll();
  }
}
