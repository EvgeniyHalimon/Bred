// library
import { ApiProperty } from '@nestjs/swagger';

// dto
import { UserPresenter } from './user-presenter';

export class GetAllUsersResponseDto {
  @ApiProperty({
    type: [UserPresenter],
    description: 'Represents array of users.',
  })
  users: UserPresenter[];

  @ApiProperty({
    type: Number,
    example: 1,
    description: 'Represents count of users',
  })
  count: number;
}
