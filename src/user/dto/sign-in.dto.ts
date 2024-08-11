// libraries
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SignInDto {
  @IsEmail()
  @IsNotEmpty({ message: '$property should not be empty' })
  readonly email: string;

  @IsString()
  @IsNotEmpty({ message: '$property should not be empty' })
  readonly password: string;
}
