// libraries
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

// constants
import { userFieldLengths } from '../user.constants';

export class SignInDto {
  @IsEmail()
  @IsNotEmpty({ message: '$property should not be empty' })
  readonly email: string;

  @IsString()
  @IsNotEmpty({ message: '$property should not be empty' })
  @MinLength(userFieldLengths.password.min, {
    message: `$property must be ${userFieldLengths.password.min} or more characters long`,
  })
  readonly password: string;
}
