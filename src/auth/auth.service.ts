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
import { SignUpResponseDto } from './dto';

// utils
import { hashPassword, verifyPassword } from './utils/passwordUtils';

// types
import { ISingInResponse, ITokens } from './auth.types';
import { IUser } from 'src/users/user.types';

// config
import { config } from '../config';

// constants
import { vocabulary } from 'src/shared';

const {
  auth: { WRONG_PASSWORD },
  users: { NOT_FOUND, ALREADY_EXISTS },
} = vocabulary;

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
      throw new BadRequestException(ALREADY_EXISTS);
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
      throw new NotFoundException(NOT_FOUND);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { photo, articles, comments, ...userWithoutPhoto } = user.dataValues;

    const match = await verifyPassword(password, user.password);
    if (!match) {
      throw new BadRequestException(WRONG_PASSWORD);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: p, ...userWithoutPassword } = user.dataValues;

    const { accessToken, refreshToken } = this.generateTokens(userWithoutPhoto);

    return {
      user: userWithoutPassword,
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  }

  async refresh(id: string): Promise<ITokens | void> {
    const user = await this.userModel.scope('withPassword').findOne({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException(NOT_FOUND);
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { photo, articles, comments, ...userWithoutPhoto } = user.dataValues;
    if (userWithoutPhoto) {
      return this.generateTokens(userWithoutPhoto);
    }
  }

  generateTokens(user: Partial<IUser>): ITokens {
    const accessToken = this.jwtService.sign(user, {
      secret: config.SECRET_ACCESS,
      expiresIn: config.EXPIRES_IN,
    });
    const refreshToken = this.jwtService.sign(user, {
      secret: config.SECRET_REFRESH,
      expiresIn: config.EXPIRES_IN_REFRESH,
    });
    return { accessToken, refreshToken };
  }
}
