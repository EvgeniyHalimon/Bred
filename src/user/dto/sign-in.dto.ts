// libraries
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignInDto {
  @IsEmail()
  @IsNotEmpty({ message: '$property should not be empty' })
  @ApiProperty({
    type: String,
    description: 'Email of user',
    required: true,
  })
  readonly email: string;

  @IsString()
  @IsNotEmpty({ message: '$property should not be empty' })
  @ApiProperty({
    type: String,
    description: 'Password of user',
    required: true,
  })
  readonly password: string;
}
