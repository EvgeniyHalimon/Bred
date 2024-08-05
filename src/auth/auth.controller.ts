import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from 'src/user/dto/sign-in.dto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { Public } from 'src/shared/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @Public()
  signIn(@Body() signInDTO: SignInDto) {
    return this.authService.signIn(signInDTO);
  }

  @HttpCode(HttpStatus.OK)
  @Post('register')
  @Public()
  signUp(@Body() signUpDTO: CreateUserDto) {
    return this.authService.signUp(signUpDTO);
  }
}
