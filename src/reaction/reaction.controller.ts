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

//service
import { ReactionsService } from './reaction.service';

// dto's
import { CreateReactionDto, GetAllQueryReactionsDto } from './dto';

// types
import { ICustomRequest } from 'src/shared/types';

@Controller('reaction')
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
    @Body() updateReactionDto: any,
  ) {
    const reactionId = id;
    const userId = request.user.id;
    return this.reactionsService.update({
      userId,
      reactionId,
      updateReactionDto,
    });
  }

  @Get('/:id')
  getAll(@Query() query: GetAllQueryReactionsDto) {
    return this.reactionsService.findAll({ query });
  }

  @Get('/:id')
  get(@Param('id') id: string) {
    const reactionId = id;
    return this.reactionsService.getById({ reactionId });
  }
}
