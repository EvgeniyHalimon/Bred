// nest
import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Get,
  Req,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

// service
import { AuthService } from './auth.service';

// decorator
import { Public } from 'src/shared/public.decorator';

// dto's
import { SignInDto, CreateUserDto } from 'src/users/dto';
import { SignInResponseDto, SignUpResponseDto } from './dto';

// types
import { ISingInResponse } from './auth.types';
import { ICustomRequest, vocabulary } from 'src/shared';

const {
  auth: { WRONG_PASSWORD },
  users: { NOT_FOUND, ALREADY_EXISTS },
} = vocabulary;

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @Public()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User successfully logged in.',
    type: SignInResponseDto,
  })
  @ApiBadRequestResponse({
    example: {
      message: WRONG_PASSWORD,
      error: 'Bad Request',
      statusCode: HttpStatus.BAD_REQUEST,
    },
    description: 'When user set incorrect password',
  })
  @ApiNotFoundResponse({
    example: {
      message: NOT_FOUND,
      error: 'Not Found',
      statusCode: HttpStatus.NOT_FOUND,
    },
    description: "When user with current email doesn't exist on database",
  })
  signIn(@Body() signInDTO: SignInDto): Promise<ISingInResponse | undefined> {
    return this.authService.signIn(signInDTO);
  }

  @HttpCode(HttpStatus.OK)
  @Post('register')
  @Public()
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'User successfully created account.',
    type: SignUpResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'When user already exists',
    example: {
      message: ALREADY_EXISTS,
      error: 'Bad Request',
      statusCode: HttpStatus.BAD_REQUEST,
    },
  })
  signUp(
    @Body() signUpDTO: CreateUserDto,
  ): Promise<SignUpResponseDto | undefined> {
    return this.authService.signUp(signUpDTO);
  }

  @Get('refresh')
  refresh(@Req() req: ICustomRequest) {
    return this.authService.refresh(req.user.id);
  }
}
