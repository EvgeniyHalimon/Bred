// nest
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';

// schema
import User from 'src/users/user.schema';

// dto's
import { CreateUserDto, SignInDto } from 'src/users/dto';

// utils
import { hashPassword, verifyPassword } from './utils/passwordUtils';
import { SignUpResponseDto } from './dto';
import { ISingInResponse } from './auth.types';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User) private userModel: typeof User,
    private jwtService: JwtService,
  ) {}

  async signUp(
    signUpDto: CreateUserDto,
  ): Promise<SignUpResponseDto | undefined> {
    const user = await this.userModel.scope('withPassword').findOne({
      where: { email: signUpDto.email },
    });

    if (user) {
      throw new BadRequestException('User already exists');
    }

    const userAttributes = {
      ...signUpDto,
      password: await hashPassword(signUpDto.password),
    };

    const createdUser = await this.userModel.create(userAttributes);
    return createdUser;
  }

  async signIn(signInDto: SignInDto): Promise<ISingInResponse | undefined> {
    const { password, email } = signInDto;

    const user = await this.userModel.scope('withPassword').findOne({
      where: { email },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { photo, ...userWithoutPhoto } = user.dataValues;

    const match = await verifyPassword(password, user.password);
    if (!match) {
      throw new BadRequestException('Wrong password');
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: p, ...userWithoutPassword } = user.dataValues;

    return {
      user: userWithoutPassword,
      accessToken: await this.jwtService.signAsync(userWithoutPhoto),
      refreshToken: await this.jwtService.signAsync(userWithoutPhoto),
    };
  }
}
