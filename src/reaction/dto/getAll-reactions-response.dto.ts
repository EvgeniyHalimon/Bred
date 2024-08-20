// library
import { ApiProperty } from '@nestjs/swagger';

// dto
import { ReactionDtoWithUser } from './reaction.dto';

export class GetAllReactionsResponseDto {
  @ApiProperty({ type: [ReactionDtoWithUser] })
  reactions: ReactionDtoWithUser[];

  @ApiProperty({
    type: Number,
    example: 1,
    description: 'Represents count of reactions',
  })
  count: number;
}
