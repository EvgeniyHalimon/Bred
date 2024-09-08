// library
import { ApiProperty } from '@nestjs/swagger';

// dto
import { UserDto } from './user.dto';

export class GetAllUsersResponseDto {
  @ApiProperty({
    type: [UserDto],
    description: 'Represents array of users.',
  })
  users: UserDto[];

  @ApiProperty({
    type: Number,
    example: 1,
    description: 'Represents count of users',
  })
  count: number;
}
