// libraries
import { IsEmail, IsEmpty, IsString, MinLength } from 'class-validator';

// constants
import { userFieldLengths } from 'src/user/validation/validationConstants';

export class SignInDto {
  @IsEmail()
  @IsEmpty({ message: '$property should not be empty' })
  readonly email: string;

  @IsString()
  @IsEmpty({ message: '$property should not be empty' })
  @MinLength(userFieldLengths.password.min, {
    message: `$property must be ${userFieldLengths.password.min} or more characters long`,
  })
  readonly password: string;
}
