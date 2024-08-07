// libraries
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

// constants
import { userFieldLengths } from '../validation/validationConstants';

export class CreateUserDto {
  @IsString()
  @MinLength(userFieldLengths.firstName.min, {
    message: `$property must be ${userFieldLengths.firstName.min} or more characters long`,
  })
  @MaxLength(userFieldLengths.firstName.max, {
    message: `$property must be maximum ${userFieldLengths.firstName.max} characters long`,
  })
  readonly firstName: string;

  @IsString()
  @MinLength(userFieldLengths.lastName.min, {
    message: `$property must be ${userFieldLengths.lastName.min} or more characters long`,
  })
  @MaxLength(userFieldLengths.lastName.max, {
    message: `$property must be maximum ${userFieldLengths.lastName.max} characters long`,
  })
  readonly lastName: string;

  @IsEmail()
  readonly email: string;

  @IsString()
  @MinLength(userFieldLengths.password.min, {
    message: `$property must be ${userFieldLengths.password.min} or more characters long`,
  })
  readonly password: string;

  @IsString()
  @MinLength(userFieldLengths.bio.min, {
    message: `$property must be ${userFieldLengths.bio.min} or more characters long`,
  })
  @MaxLength(userFieldLengths.bio.max, {
    message: `$property must be maximum ${userFieldLengths.bio.max} characters long`,
  })
  readonly bio: string;

  @IsString()
  readonly photo: Buffer;
}
