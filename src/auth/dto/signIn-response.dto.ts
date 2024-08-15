import { ApiProperty } from '@nestjs/swagger';

export class SignInResponseDto {
  @ApiProperty({ example: 'accessToken' })
  accessToken: string;

  @ApiProperty({ example: 'refreshToken' })
  refreshToken: string;
}
