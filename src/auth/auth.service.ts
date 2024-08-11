// nest
import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

// schema
import { User } from 'src/user/user.schema';

// service
import { UsersService } from 'src/user/user.service';

// dto's
import { CreateUserDto, SignInDto } from 'src/user/dto';

// types
import { IMessageResponse } from 'src/shared/types';

// utils
import { hashPassword, verifyPassword } from './utils/passwordUtils';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpDto: CreateUserDto): Promise<IMessageResponse<User>> {
    try {
      const userAttributes = {
        ...signUpDto,
        password: await hashPassword(signUpDto.password),
      };
      const createdUser = await this.usersService.create(userAttributes);
      return { data: { createdUser }, message: 'User created successfully' };
    } catch (err) {
      console.log(
        '🚀 ~ file: auth.service.ts:29 ~ AuthService ~ signUp ~ err:',
        err,
      );
      throw err;
    }
  }

  async signIn(
    signInDto: SignInDto,
  ): Promise<{ accessToken: string; refreshToken: string } | undefined> {
    try {
      const { password } = signInDto;
      const user = await this.usersService.signIn(signInDto);

      if (user) {
        const match = await verifyPassword(password, user.password);
        if (!match) {
          throw new BadRequestException();
        }
        return {
          accessToken: await this.jwtService.signAsync(user),
          refreshToken: await this.jwtService.signAsync(user),
        };
      }
    } catch (err) {
      console.log('🚀 ~ file: auth.service.ts:58 ~ AuthService ~ err:', err);
      throw err;
    }
  }
}
