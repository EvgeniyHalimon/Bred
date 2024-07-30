import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/schemas/user.schema';
import { IUser } from './interfaces/user.interfaces';
import { Sequelize } from 'sequelize';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userModel: typeof User,
    private sequelize: Sequelize,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const result = await this.sequelize.transaction(async t => {
        const transactionHost = { transaction: t };

        const userAttributes = {
          firstName: createUserDto.firstName,
          lastName: createUserDto.lastName,
          email: createUserDto.email,
          password: createUserDto.password,
          bio: createUserDto.bio,
          photo: createUserDto.photo,
        };
        const createdUser = await this.userModel.create(
          userAttributes,
          transactionHost,
        );
        return createdUser;
      });

      return result;
    } catch (err) {
      console.log('🚀 ~ UsersService ~ create ~ err:', err);
      throw err;
    }
  }

  async findAll(): Promise<User[]> {
    return this.userModel.findAll();
  }
}
