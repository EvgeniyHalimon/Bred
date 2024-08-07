// nest
import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

// schema
import { User } from 'src/user/schema/user.schema';

// service
import { UsersService } from 'src/user/user.service';

// dto's
import { CreateUserDto } from '../user/dto/create-user.dto';
import { SignInDto } from '../user/dto/sign-in.dto';

// types
import { IMessageResponse } from 'src/shared/types';

// utils
import { hashPassword, verifyPassword } from 'src/shared/passwordUtils';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpDto: CreateUserDto): Promise<IMessageResponse<User>> {
    try {
      const userAttributes = {
        firstName: signUpDto.firstName,
        lastName: signUpDto.lastName,
        email: signUpDto.email,
        password: await hashPassword(signUpDto.password),
        bio: signUpDto.bio,
        photo: signUpDto.photo,
      };
      const createdUser = await this.usersService.create(userAttributes);
      return { data: createdUser, message: 'User created successfully' };
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
      const userAttributes = {
        email: signInDto.email,
        password: signInDto.password,
      };
      const user = await this.usersService.signIn(userAttributes);

      if (user) {
        const match = verifyPassword(userAttributes.password, user.password);
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
