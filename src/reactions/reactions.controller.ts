// nest
import { Body, Controller, Post, Delete, Put, Get, Req } from '@nestjs/common';

//service
import { ReactionsService } from './reactions.service';

// dto's
import { CreateReactionDto } from './dto';

// types
import { ICustomRequest } from 'src/shared/types';

@Controller('reactions')
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
  delete(@Req() request: ICustomRequest) {
    const userId = request.user.id;
    const reactionId = request.query.id as string;
    return this.reactionsService.delete({ userId, reactionId });
  }
  @Put('/:id')
  update(@Req() request: ICustomRequest, @Body() updateArticleDto: any) {
    const reactionId = request.params.id;
    const userId = request.user.id;
    return this.reactionsService.update({
      userId,
      reactionId,
      updateArticleDto,
    });
  }
  @Get('/')
  get(@Req() request: ICustomRequest) {
    const reactionId = request.query.id as string;
    return this.reactionsService.getById({ reactionId });
  }
}
