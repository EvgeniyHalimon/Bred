import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { User } from 'src/user/schema/user.schema';
import { UsersService } from 'src/user/user.service';
import { SignInDto } from '../user/dto/sign-in.dto';
import { hashPassword, verifyPassword } from 'src/shared/passwordUtils';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpDto: CreateUserDto): Promise<User> {
    try {
      const userAttributes = {
        firstName: signUpDto.firstName,
        lastName: signUpDto.lastName,
        email: signUpDto.email,
        password: hashPassword(signUpDto.password) as unknown as string,
        bio: signUpDto.bio,
        photo: signUpDto.photo,
      };
      const createdUser = await this.usersService.create(userAttributes);
      return createdUser;
    } catch (err) {
      console.log('🚀 ~ UsersService ~ create ~ err:', err);
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
      console.log('🚀 ~ UsersService ~ create ~ err:', err);
      throw err;
    }
  }
}
