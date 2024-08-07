// nest
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

// schema
import { User } from './schema/user.schema';

// dto's
import { CreateUserDto } from './dto/create-user.dto';
import { SignInDto } from './dto/sign-in.dto';

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
      const userAttributes = {
        firstName: createUserDto.firstName,
        lastName: createUserDto.lastName,
        email: createUserDto.email,
        password: createUserDto.password,
        bio: createUserDto.bio,
        photo: createUserDto.photo,
      };
      const createdUser = await this.userModel.create(userAttributes);
      return createdUser;
    } catch (err) {
      console.log(
        '🚀 ~ file: user.service.ts:34 ~ UsersService ~ create ~ err:',
        err,
      );
      throw err;
    }
  }

  async signIn(signInDto: SignInDto): Promise<User | null> {
    try {
      const user = await this.userModel.findOne({
        where: { email: signInDto.email },
      });
      if (!user) {
        throw new NotFoundException('User not found');
      }
      return user;
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
