// libraries
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

// constants
import { userFieldLengths } from '../user.constants';

// custom decorators
import {
  MaxLengthWithMessage,
  MinLengthWithMessage,
} from 'src/shared/decorators';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty({ message: '$property must be not empty' })
  @MaxLengthWithMessage({
    max: userFieldLengths.firstName.max,
    property: 'First name',
  })
  readonly firstName: string;

  @IsString()
  @IsNotEmpty({ message: '$property must be not empty' })
  @MaxLengthWithMessage({
    max: userFieldLengths.lastName.max,
    property: 'Last name',
  })
  readonly lastName: string;

  @IsEmail()
  readonly email: string;

  @IsString()
  @MinLengthWithMessage({
    min: userFieldLengths.password.min,
    property: 'Password',
  })
  readonly password: string;

  @IsString()
  @MinLengthWithMessage({ min: userFieldLengths.bio.min, property: 'Bio' })
  @MaxLengthWithMessage({
    max: userFieldLengths.bio.max,
    property: 'Bio',
  })
  @ApiProperty({
    type: String,
    description: 'Bio of user',
    required: true,
    minLength: userFieldLengths.bio.min,
    maxLength: userFieldLengths.bio.max,
  })
  readonly bio: string;

  @IsOptional()
  @ApiProperty({
    type: Buffer,
    description: 'Photo of user',
    required: false,
  })
  readonly photo?: Buffer;
}
