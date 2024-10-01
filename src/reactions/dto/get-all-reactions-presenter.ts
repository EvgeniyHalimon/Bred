// library
import { ApiProperty } from '@nestjs/swagger';

// dto
import { ReactionDtoWithUser } from './reaction.dto';
import Reaction from '../reaction.schema';

export class GetAllReactionsPresenter {
  @ApiProperty({ type: [ReactionDtoWithUser] })
  reactions: ReactionDtoWithUser[];

  @ApiProperty({
    type: Number,
    example: 1,
    description: 'Represents count of reactions',
  })
  count: number;

  constructor(reactions: Reaction[], count: number) {
    this.reactions = reactions.map(
      reaction => new ReactionDtoWithUser(reaction),
    );
    this.count = count;
  }
}
