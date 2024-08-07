// nest
import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';

// service
import { AuthService } from './auth.service';

// decorator
import { Public } from 'src/shared/public.decorator';

// dto's
import { SignInDto } from 'src/user/dto/sign-in.dto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

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
