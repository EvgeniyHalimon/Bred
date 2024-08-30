// nest
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';

// schema
import User from 'src/user/user.schema';

// dto's
import { CreateUserDto, SignInDto } from 'src/user/dto';

// utils
import { hashPassword, verifyPassword } from './utils/passwordUtils';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User) private userModel: typeof User,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpDto: CreateUserDto): Promise<User> {
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

  async signIn(
    signInDto: SignInDto,
  ): Promise<{ accessToken: string; refreshToken: string } | undefined> {
    const { password } = signInDto;

    const user = await this.userModel.scope('withPassword').findOne({
      where: { email: signInDto.email },
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

    return {
      accessToken: await this.jwtService.signAsync(userWithoutPhoto),
      refreshToken: await this.jwtService.signAsync(userWithoutPhoto),
    };
  }
}
