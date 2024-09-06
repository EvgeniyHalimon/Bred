import { ApiProperty } from '@nestjs/swagger';
import { SignUpResponseDto } from './singUp-response.dto';

export class SignInResponseDto {
  @ApiProperty({
    example: {
      id: 'd0601328-1486-434a-860e-75b843a682db',
      firstName: 'string',
      lastName: 'string',
      email: 'q@email.com',
      password: '$2b$10$VyRQLlzg18ACDvROujW4BuBlT8480OO7e495F38tGCknMZD/0n/hO',
      bio: 'Hello my name is Monti',
      role: 'user',
      photo: '',
      createdAt: '2024-08-14T08:40:32.000Z',
      updatedAt: '2024-08-23T11:50:47.000Z',
    },
  })
  user: SignUpResponseDto;

  @ApiProperty({ example: 'accessToken' })
  accessToken: string;

  @ApiProperty({ example: 'refreshToken' })
  refreshToken: string;
}
