// nest
import {
  Body,
  Controller,
  Post,
  Delete,
  Put,
  Get,
  Req,
  Param,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

//service
import { ReactionsService } from './reaction.service';

// dto's
import {
  CreateReactionDto,
  GetAllQueryReactionsDto,
  UpdateReactionDto,
} from './dto';

// types
import { ICustomRequest } from 'src/shared/types';
import { ReactionOrderByEnum } from './reaction.types';

// custom decorators
import { ApiQueriesFromDto } from 'src/shared/decorators';

@Controller('reactions')
@ApiTags('Reactions')
export class ReactionsController {
  constructor(private reactionsService: ReactionsService) {}

  @Post('/')
  create(
    @Req() request: ICustomRequest,
    @Body() createReactionDto: CreateReactionDto,
  ) {
    const userId = request.user.id;
    return this.reactionsService.create({ userId, createReactionDto });
  }

  @Delete('/:id')
  delete(@Req() request: ICustomRequest, @Param('id') id: string) {
    const userId = request.user.id;
    const reactionId = id;
    return this.reactionsService.delete({ userId, reactionId });
  }

  @Put('/:id')
  update(
    @Req() request: ICustomRequest,
    @Param('id') id: string,
    @Body() updateReactionDto: UpdateReactionDto,
  ) {
    const reactionId = id;
    const userId = request.user.id;
    return this.reactionsService.update({
      userId,
      reactionId,
      updateReactionDto,
    });
  }

  @Get('/')
  @ApiQueriesFromDto(GetAllQueryReactionsDto, ReactionOrderByEnum)
  getAll(@Query() query: GetAllQueryReactionsDto) {
    return this.reactionsService.findAll({ query });
  }

  @Get('/:id')
  get(@Param('id') id: string) {
    const reactionId = id;
    return this.reactionsService.getById({ reactionId });
  }
}
